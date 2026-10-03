// "Passe a espátula": uma cuba de gelato com superfície simulada na GPU (mapa de altura em
// render targets ping-pong). O cursor/dedo esculpe sulcos com bordas levantadas, que relaxam devagar.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type CorSabor = { cor: string; detalhe: string; graos: number };

type Opcoes = { canvas: HTMLCanvasElement; palco: HTMLElement; sabor: CorSabor; reduzido: boolean };

const LARG = 2.0; // largura da cuba (x)
const PROF = 1.3; // profundidade (z)
const RES = 256;
const ESCALA_ALTURA = 0.16;

const RUIDO = /* glsl */ `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
`;

const VERT_QUAD = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG_INICIO = /* glsl */ `
  varying vec2 vUv;
  uniform float uSemente;
  ${RUIDO}
  void main(){
    vec2 c = (vUv - 0.5) * vec2(1.0, 1.35);
    float monte = 0.56 - dot(c, c) * 0.95;
    float ang = atan(c.y, c.x);
    float r = length(c);
    float ondas = sin(r * 34.0 + fbm(vUv * 3.0 + uSemente) * 5.0 + ang * 2.0) * 0.05;
    float h = monte + ondas + (fbm(vUv * 7.0 + uSemente) - 0.5) * 0.07;
    // bordas da cuba mais baixas, rente ao metal
    float borda = smoothstep(0.0, 0.06, vUv.x) * smoothstep(0.0, 0.06, 1.0 - vUv.x) * smoothstep(0.0, 0.08, vUv.y) * smoothstep(0.0, 0.08, 1.0 - vUv.y);
    h = mix(0.18, h, borda);
    gl_FragColor = vec4(h, h, h, 1.0);
  }
`;

const FRAG_PINCEL = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uAnterior;
  uniform vec2 uA;
  uniform vec2 uB;
  uniform float uRaio;
  uniform float uForca;
  float distSeg(vec2 p, vec2 a, vec2 b){
    vec2 pa = p - a, ba = b - a;
    float t = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    return length(pa - ba * t);
  }
  void main(){
    float h = texture2D(uAnterior, vUv).r;
    vec2 s = vec2(1.0, ${(PROF / LARG).toFixed(3)});
    float d = distSeg(vUv * s, uA * s, uB * s);
    float sulco = smoothstep(uRaio, uRaio * 0.15, d);
    float crista = exp(-pow((d - uRaio * 1.05) / (uRaio * 0.38), 2.0));
    h = mix(h, 0.34, sulco * uForca) + crista * uForca * 0.045;
    gl_FragColor = vec4(h, h, h, 1.0);
  }
`;

const FRAG_RELAXA = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uAnterior;
  uniform sampler2D uBase;
  uniform vec2 uTexel;
  uniform float uRelaxa;
  uniform float uVolta;
  void main(){
    float c = texture2D(uAnterior, vUv).r;
    float n = texture2D(uAnterior, vUv + vec2(0.0, uTexel.y)).r + texture2D(uAnterior, vUv - vec2(0.0, uTexel.y)).r
            + texture2D(uAnterior, vUv + vec2(uTexel.x, 0.0)).r + texture2D(uAnterior, vUv - vec2(uTexel.x, 0.0)).r;
    float h = mix(c, n * 0.25, uRelaxa);
    h = mix(h, texture2D(uBase, vUv).r, uVolta);
    gl_FragColor = vec4(h, h, h, 1.0);
  }
`;

const VERT_GELATO = /* glsl */ `
  uniform sampler2D uAltura;
  uniform float uEscala;
  varying vec2 vUv;
  varying vec3 vMundo;
  void main(){
    vUv = uv;
    vec3 p = position;
    p.y += texture2D(uAltura, uv).r * uEscala;
    vec4 m = modelMatrix * vec4(p, 1.0);
    vMundo = m.xyz;
    gl_Position = projectionMatrix * viewMatrix * m;
  }
`;

const FRAG_GELATO = /* glsl */ `
  uniform sampler2D uAltura;
  uniform vec2 uTexel;
  uniform float uEscala;
  uniform vec3 uCor;
  uniform vec3 uDetalhe;
  uniform float uGraos;
  uniform vec3 uLuz;
  varying vec2 vUv;
  varying vec3 vMundo;
  ${RUIDO}
  void main(){
    float hL = texture2D(uAltura, vUv - vec2(uTexel.x, 0.0)).r;
    float hR = texture2D(uAltura, vUv + vec2(uTexel.x, 0.0)).r;
    float hD = texture2D(uAltura, vUv - vec2(0.0, uTexel.y)).r;
    float hU = texture2D(uAltura, vUv + vec2(0.0, uTexel.y)).r;
    float dx = ${LARG.toFixed(2)} * uTexel.x * 2.0;
    float dz = ${PROF.toFixed(2)} * uTexel.y * 2.0;
    vec3 N = normalize(vec3(-(hR - hL) * uEscala / dx, 1.0, (hU - hD) * uEscala / dz));
    // textura fina, gelada
    vec2 g = vec2(noise(vUv * vec2(520.0, 338.0)), noise(vUv * vec2(338.0, 520.0) + 7.0)) - 0.5;
    N = normalize(N + vec3(g.x, 0.0, g.y) * 0.16);

    vec3 L = normalize(uLuz);
    vec3 V = normalize(cameraPosition - vMundo);
    vec3 H = normalize(L + V);
    float dif = (dot(N, L) + 0.6) / 1.6;
    float esp = pow(max(dot(N, H), 0.0), 26.0) * 0.2;
    float h = texture2D(uAltura, vUv).r;
    vec3 base = mix(uCor * 0.8, uCor * 1.05, smoothstep(0.22, 0.64, h));

    // inclusões (farofa, pedaços): pontinhos redondos espalhados
    vec2 gv = vUv * vec2(150.0, 97.5);
    vec2 id = floor(gv);
    vec2 f = fract(gv) - 0.5;
    vec2 off = vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5;
    float pont = step(1.0 - uGraos, hash(id)) * smoothstep(0.24, 0.12, length(f - off * 0.45));
    base = mix(base, uDetalhe, pont * 0.9);

    vec3 col = base * (0.4 + 0.7 * dif) + vec3(1.0, 0.97, 0.92) * esp;
    col += uCor * 0.14 * pow(1.0 - max(dot(N, V), 0.0), 2.0);
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

export function iniciarEspatula({ canvas, palco, sabor, reduzido }: Opcoes) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: window.devicePixelRatio < 2,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 900 ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  const posCamera = new THREE.Vector3(0, 2.55, 2.25);
  camera.position.copy(posCamera);
  camera.lookAt(0, 0, 0.06);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const ambiente = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  cena.environment = ambiente;

  // ------------------------------------------------ simulação (ping-pong)
  const tipo = renderer.extensions.has('EXT_color_buffer_float') ? THREE.FloatType : THREE.HalfFloatType;
  const novoAlvo = () =>
    new THREE.WebGLRenderTarget(RES, RES, {
      type: tipo,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });
  let ler = novoAlvo();
  let escrever = novoAlvo();
  const base = novoAlvo();

  const camQuad = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  const cenaQuad = new THREE.Scene();
  cenaQuad.add(quad);
  const texel = new THREE.Vector2(1 / RES, 1 / RES);

  const matInicio = new THREE.ShaderMaterial({
    vertexShader: VERT_QUAD,
    fragmentShader: FRAG_INICIO,
    uniforms: { uSemente: { value: Math.random() * 10 } },
  });
  const matPincel = new THREE.ShaderMaterial({
    vertexShader: VERT_QUAD,
    fragmentShader: FRAG_PINCEL,
    uniforms: {
      uAnterior: { value: null },
      uA: { value: new THREE.Vector2() },
      uB: { value: new THREE.Vector2() },
      uRaio: { value: 0.06 },
      uForca: { value: 0.85 },
    },
  });
  const matRelaxa = new THREE.ShaderMaterial({
    vertexShader: VERT_QUAD,
    fragmentShader: FRAG_RELAXA,
    uniforms: {
      uAnterior: { value: null },
      uBase: { value: base.texture },
      uTexel: { value: texel },
      uRelaxa: { value: 0.035 },
      uVolta: { value: 0.0016 },
    },
  });

  const passo = (mat: THREE.ShaderMaterial, alvo: THREE.WebGLRenderTarget) => {
    quad.material = mat;
    renderer.setRenderTarget(alvo);
    renderer.render(cenaQuad, camQuad);
    renderer.setRenderTarget(null);
  };
  const trocar = () => {
    const t = ler;
    ler = escrever;
    escrever = t;
  };
  passo(matInicio, base);
  passo(matInicio, ler);

  // ------------------------------------------------------------ gelato
  const geo = new THREE.PlaneGeometry(LARG, PROF, 220, 143);
  geo.rotateX(-Math.PI / 2);
  const cores = {
    cor: new THREE.Color(sabor.cor),
    detalhe: new THREE.Color(sabor.detalhe),
  };
  const matGelato = new THREE.ShaderMaterial({
    vertexShader: VERT_GELATO,
    fragmentShader: FRAG_GELATO,
    uniforms: {
      uAltura: { value: ler.texture },
      uTexel: { value: texel },
      uEscala: { value: ESCALA_ALTURA },
      uCor: { value: cores.cor },
      uDetalhe: { value: cores.detalhe },
      uGraos: { value: sabor.graos },
      uLuz: { value: new THREE.Vector3(0.7, 1.4, 0.55) },
    },
  });
  const gelato = new THREE.Mesh(geo, matGelato);
  cena.add(gelato);

  // ------------------------------------------------------------- cuba
  const contorno = (w: number, d: number, r: number) => {
    const s = new THREE.Shape();
    s.moveTo(-w / 2 + r, -d / 2);
    s.lineTo(w / 2 - r, -d / 2);
    s.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
    s.lineTo(w / 2, d / 2 - r);
    s.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2);
    s.lineTo(-w / 2 + r, d / 2);
    s.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r);
    s.lineTo(-w / 2, -d / 2 + r);
    s.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
    return s;
  };
  const aro = contorno(LARG + 0.16, PROF + 0.16, 0.08);
  aro.holes.push(contorno(LARG - 0.005, PROF - 0.005, 0.03) as unknown as THREE.Path);
  const geoAro = new THREE.ExtrudeGeometry(aro, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3 });
  geoAro.rotateX(-Math.PI / 2);
  const metal = new THREE.MeshStandardMaterial({ color: 0xd8d2c8, metalness: 0.92, roughness: 0.3 });
  const cuba = new THREE.Mesh(geoAro, metal);
  cuba.position.y = 0.0;
  cena.add(cuba);

  // ----------------------------------------------------------- espátula
  const espatula = new THREE.Group();
  const pa = new THREE.Shape();
  pa.moveTo(-0.11, 0);
  pa.lineTo(0.11, 0);
  pa.quadraticCurveTo(0.12, 0.16, 0.035, 0.2);
  pa.lineTo(-0.035, 0.2);
  pa.quadraticCurveTo(-0.12, 0.16, -0.11, 0);
  const geoPa = new THREE.ExtrudeGeometry(pa, { depth: 0.008, bevelEnabled: true, bevelThickness: 0.003, bevelSize: 0.004, bevelSegments: 2 });
  const plastico = new THREE.MeshStandardMaterial({ color: 0xf5efe6, metalness: 0.0, roughness: 0.45 });
  const meshPa = new THREE.Mesh(geoPa, plastico);
  const cabo = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.018, 0.5, 16), new THREE.MeshStandardMaterial({ color: 0xb26a5b, roughness: 0.5 }));
  cabo.position.set(0, 0.44, 0.004);
  espatula.add(meshPa, cabo);
  const pivo = new THREE.Group();
  espatula.rotation.x = -1.05; // inclinada, como na mão
  pivo.add(espatula);
  pivo.visible = false;
  cena.add(pivo);

  // ------------------------------------------------------------ ponteiro
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const plano = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.07);
  const ponto = new THREE.Vector3();
  let uvAtual: THREE.Vector2 | null = null;
  let uvAnterior: THREE.Vector2 | null = null;
  let mexeu = false;
  let ativo = true;
  const alvoPivo = new THREE.Vector3();
  let rumo = 0;

  const paraUv = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    if (!raycaster.ray.intersectPlane(plano, ponto)) return null;
    const u = ponto.x / LARG + 0.5;
    const v = -ponto.z / PROF + 0.5;
    if (u < -0.05 || u > 1.05 || v < -0.05 || v > 1.05) return null;
    return new THREE.Vector2(THREE.MathUtils.clamp(u, 0, 1), THREE.MathUtils.clamp(v, 0, 1));
  };

  const mover = (e: PointerEvent) => {
    if (!ativo) return;
    if (e.pointerType !== 'mouse' && e.buttons === 0 && e.type !== 'pointerdown') return;
    const uv = paraUv(e);
    if (!uv) {
      pivo.visible = false;
      uvAnterior = null;
      return;
    }
    if (uvAtual) uvAnterior = uvAtual.clone();
    uvAtual = uv;
    mexeu = true;
    pivo.visible = true;
    alvoPivo.set((uv.x - 0.5) * LARG, 0.12, -(uv.y - 0.5) * PROF);
    if (uvAnterior) {
      const dx = uv.x - uvAnterior.x;
      const dy = uv.y - uvAnterior.y;
      if (Math.hypot(dx, dy) > 0.002) rumo = Math.atan2(dx, dy);
    }
  };
  canvas.addEventListener('pointermove', mover);
  canvas.addEventListener('pointerdown', mover);
  canvas.addEventListener('pointerleave', () => {
    pivo.visible = false;
    uvAtual = null;
    uvAnterior = null;
  });

  // -------------------------------------------------------- tamanho/loop
  const redimensionar = () => {
    const w = palco.clientWidth;
    const h = palco.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // enquadra a cuba inteira em qualquer proporção
    const distancia = w / h < 1.1 ? 3.6 : 2.55;
    camera.position.set(0, distancia, distancia * 0.88);
    posCamera.copy(camera.position);
    camera.lookAt(0, 0, 0.06);
    camera.updateProjectionMatrix();
  };
  redimensionar();
  const ro = new ResizeObserver(redimensionar);
  ro.observe(palco);

  let visivel = true;
  const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting), { rootMargin: '120px' });
  io.observe(palco);

  const mouse = { x: 0, y: 0 };
  palco.addEventListener('pointermove', (e) => {
    const r = palco.getBoundingClientRect();
    mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });

  const relogio = new THREE.Timer();
  renderer.setAnimationLoop((tempo) => {
    relogio.update(tempo);
    if (!visivel || document.hidden) return;
    const dt = Math.min(relogio.getDelta(), 0.05);

    if (mexeu && uvAtual) {
      const a = uvAnterior ?? uvAtual;
      matPincel.uniforms.uAnterior.value = ler.texture;
      matPincel.uniforms.uA.value.copy(a);
      matPincel.uniforms.uB.value.copy(uvAtual);
      passo(matPincel, escrever);
      trocar();
      mexeu = false;
    }
    matRelaxa.uniforms.uAnterior.value = ler.texture;
    passo(matRelaxa, escrever);
    trocar();
    matGelato.uniforms.uAltura.value = ler.texture;

    // espátula acompanha o ponteiro, levemente atrasada
    if (pivo.visible) {
      pivo.position.lerp(alvoPivo, 1 - Math.pow(0.0008, dt));
      pivo.rotation.y += (rumo + Math.PI - pivo.rotation.y) * Math.min(1, dt * 8);
    }
    if (!reduzido) {
      camera.position.x += (posCamera.x + mouse.x * 0.12 - camera.position.x) * Math.min(1, dt * 3);
      camera.position.y += (posCamera.y - mouse.y * 0.06 - camera.position.y) * Math.min(1, dt * 3);
      camera.lookAt(0, 0, 0.06);
    }
    renderer.render(cena, camera);
  });

  return {
    trocarSabor(s: CorSabor, duracao = 0.8) {
      const de = { c: cores.cor.clone(), d: cores.detalhe.clone(), g: matGelato.uniforms.uGraos.value as number };
      const para = { c: new THREE.Color(s.cor), d: new THREE.Color(s.detalhe), g: s.graos };
      const ini = performance.now();
      const anima = () => {
        const t = Math.min(1, (performance.now() - ini) / (duracao * 1000));
        const k = 1 - Math.pow(1 - t, 3);
        cores.cor.copy(de.c).lerp(para.c, k);
        cores.detalhe.copy(de.d).lerp(para.d, k);
        matGelato.uniforms.uGraos.value = de.g + (para.g - de.g) * k;
        if (t < 1) requestAnimationFrame(anima);
      };
      anima();
      // um sabor novo chega com a cuba "alisada"
      matInicio.uniforms.uSemente.value = Math.random() * 10;
      passo(matInicio, base);
    },
    ativar(v: boolean) {
      ativo = v;
      if (!v) pivo.visible = false;
    },
    destruir() {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      io.disconnect();
      [ler, escrever, base].forEach((t) => t.dispose());
      geo.dispose();
      geoAro.dispose();
      geoPa.dispose();
      ambiente.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
