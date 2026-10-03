// Fachada de micélio: um plano em shader com o relevo da "casquinha" (painéis quadrados com treliça
// de losangos), iluminado por uma luz rasante que segue o cursor. A rolagem faz os painéis "crescerem"
// a partir de filamentos claros, como micélio; um clique faz o relevo "respirar" em onda.
import * as THREE from 'three';

type Opcoes = {
  canvas: HTMLCanvasElement;
  palco: HTMLElement;
  /** elemento que recebe o ponteiro (o texto fica por cima do canvas) */
  alvoPonteiro?: HTMLElement;
  reduzido: boolean;
  ponteiroFino: boolean;
};

const FRAG = /* glsl */ `
  uniform float uCrescer;
  uniform vec2 uLuz;
  uniform vec2 uAspecto;
  uniform vec3 uCor;
  uniform vec3 uPapel;
  uniform vec3 uFio;
  uniform vec3 uOnda;
  uniform float uTempo;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.07; a *= 0.5; } return v; }

  const float AMP = 0.035;

  // relevo em unidades de painel: costuras entre painéis + cristas arredondadas em losango
  float altura(vec2 p){
    vec2 cel = fract(p);
    float costura = smoothstep(0.0, 0.03, cel.x) * smoothstep(0.0, 0.03, 1.0 - cel.x)
                  * smoothstep(0.0, 0.03, cel.y) * smoothstep(0.0, 0.03, 1.0 - cel.y);
    vec2 q = cel * 2.5 + 0.25;
    vec2 r = vec2(q.x + q.y, q.x - q.y);
    vec2 f = abs(fract(r) - 0.5);
    float d = min(f.x, f.y);
    float crista = smoothstep(0.17, 0.0, d);
    crista = crista * crista * (3.0 - 2.0 * crista);
    // grão do biomaterial
    float grao = noise(p * 90.0) * 0.06;
    return AMP * costura * (0.35 + 0.65 * crista + grao);
  }

  void main(){
    vec2 p = vUv * uAspecto;
    float e = 0.0025;
    float h = altura(p);
    float dx = (altura(p + vec2(e, 0.0)) - altura(p - vec2(e, 0.0))) / (2.0 * e);
    float dy = (altura(p + vec2(0.0, e)) - altura(p - vec2(0.0, e))) / (2.0 * e);

    // onda do clique
    float rr = length((vUv - uOnda.xy) * uAspecto);
    float onda = exp(-pow(rr - uOnda.z * 2.4, 2.0) * 9.0) * exp(-uOnda.z * 1.3);
    float k = 1.0 + onda * 1.6;
    vec3 N = normalize(vec3(-dx * k, -dy * k, 1.0));

    vec3 pos = vec3(p, h);
    vec3 luz = vec3(uLuz * uAspecto, 0.55);
    vec3 L = normalize(luz - pos);
    float dist = length(luz.xy - pos.xy);
    float atenua = 1.0 / (1.0 + dist * dist * 0.35);
    float dif = max(dot(N, L), 0.0);
    vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
    float esp = pow(max(dot(N, H), 0.0), 24.0) * 0.22;
    float cavidade = mix(0.72, 1.0, clamp(h / AMP, 0.0, 1.0));

    // cada painel tem um tom levemente diferente (micélio nunca é idêntico)
    float tom = (hash(floor(p)) - 0.5) * 0.08 + (fbm(p * 3.0) - 0.5) * 0.08;
    vec3 base = uCor * (1.0 + tom) * (1.0 + onda * 0.12);
    vec3 painel = base * cavidade * (0.38 + 1.05 * dif * atenua) + vec3(1.0, 0.94, 0.86) * esp * atenua;

    // crescimento: limiar de ruído controlado pela rolagem, com borda de filamentos claros
    float n = fbm(vUv * vec2(2.6, 2.0) + vec2(0.0, uTempo * 0.012)) * 0.85 + hash(floor(p)) * 0.15;
    float limiar = uCrescer * 1.3 - 0.15;
    float cresceu = smoothstep(n - 0.012, n + 0.012, limiar);
    float borda = smoothstep(0.07, 0.0, abs(n - limiar));
    float fios = smoothstep(0.55, 0.75, noise(vUv * vec2(160.0, 110.0) + n * 7.0));
    vec3 substrato = uPapel * (0.92 + fbm(p * 7.0) * 0.12);
    vec3 col = mix(substrato, painel, cresceu);
    col = mix(col, uFio, clamp(borda * (0.5 + fios), 0.0, 1.0) * (1.0 - cresceu * 0.55));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

export function iniciarMicelio({ canvas, palco, alvoPonteiro = palco, reduzido, ponteiroFino }: Opcoes) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const cena = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uCrescer: { value: reduzido ? 1 : 0 },
    uLuz: { value: new THREE.Vector2(0.62, 0.62) },
    uAspecto: { value: new THREE.Vector2(6, 3.4) },
    uCor: { value: new THREE.Color('#b26a5b') },
    uPapel: { value: new THREE.Color('#dad3a7') },
    uFio: { value: new THREE.Color('#f5efe6') },
    uOnda: { value: new THREE.Vector3(0.5, 0.5, 99) },
    uTempo: { value: 0 },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: FRAG,
    uniforms,
  });
  const geo = new THREE.PlaneGeometry(2, 2);
  cena.add(new THREE.Mesh(geo, mat));

  const redimensionar = () => {
    const w = Math.max(1, palco.clientWidth);
    const h = Math.max(1, palco.clientHeight);
    renderer.setSize(w, h, false);
    // painéis quadrados de ~150–240 px
    const colunas = Math.max(3, Math.round(w / 210));
    uniforms.uAspecto.value.set(colunas, (colunas * h) / w);
  };
  redimensionar();
  const ro = new ResizeObserver(redimensionar);
  ro.observe(palco);

  const alvo = new THREE.Vector2(0.62, 0.62);
  const paraUv = (e: PointerEvent) => {
    const r = palco.getBoundingClientRect();
    return new THREE.Vector2((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
  };
  const mover = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' || ponteiroFino) alvo.copy(paraUv(e));
  };
  const clicar = (e: PointerEvent) => {
    const uv = paraUv(e);
    uniforms.uOnda.value.set(uv.x, uv.y, 0);
  };
  alvoPonteiro.addEventListener('pointermove', mover);
  alvoPonteiro.addEventListener('pointerdown', clicar);

  let visivel = true;
  const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting), { rootMargin: '100px' });
  io.observe(palco);

  let alvoCrescer = uniforms.uCrescer.value;
  const relogio = new THREE.Timer();
  let passeio = 0;
  renderer.setAnimationLoop((tempo) => {
    relogio.update(tempo);
    if (!visivel || document.hidden) return;
    const dt = Math.min(relogio.getDelta(), 0.05);
    uniforms.uTempo.value += dt;
    uniforms.uOnda.value.z += dt;
    if (!ponteiroFino && !reduzido) {
      // no toque, a luz passeia sozinha
      passeio += dt * 0.3;
      alvo.set(0.5 + Math.cos(passeio) * 0.34, 0.5 + Math.sin(passeio * 1.3) * 0.3);
    }
    uniforms.uLuz.value.lerp(alvo, 1 - Math.pow(0.004, dt));
    uniforms.uCrescer.value += (alvoCrescer - uniforms.uCrescer.value) * (1 - Math.pow(0.002, dt));
    renderer.render(cena, camera);
  });

  return {
    crescer(v: number) {
      alvoCrescer = v;
    },
    destruir() {
      renderer.setAnimationLoop(null);
      alvoPonteiro.removeEventListener('pointermove', mover);
      alvoPonteiro.removeEventListener('pointerdown', clicar);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    },
  };
}
