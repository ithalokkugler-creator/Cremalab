#!/usr/bin/env python3
"""Vetoriza os PNGs da marca Crema Lab para o site.

Gera, em src/assets/marca/:
  - monograma.json  formas preenchidas (potrace) + esqueletos para a máscara de desenho
  - wordmark.json   idem, já na horizontal (o PNG original está girado 90°)
  - mural.json      line art do mural em linha central (traço único por linha),
                    agrupada por elemento, pronta para DrawSVG
e prévias em scripts/marca/previas/ para conferência visual.

Uso:  python3 scripts/marca/vetorizar.py
Requer: pillow numpy scipy scikit-image potracer
"""
from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np
import potrace
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from skimage.measure import label, regionprops
from skimage.morphology import skeletonize

RAIZ = Path(__file__).resolve().parents[2]
SAIDA = RAIZ / "src" / "assets" / "marca"
PREVIAS = Path(__file__).resolve().parent / "previas"

NB8 = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


# --------------------------------------------------------------------------- io
def carregar(nome: str, girar_ccw: bool = False, margem: int = 12, suavizar: float = 0.0):
    im = Image.open(RAIZ / nome).convert("RGBA")
    if girar_ccw:
        im = im.transpose(Image.Transpose.ROTATE_90)
    alfa = np.array(im.getchannel("A")).astype(float) / 255
    if suavizar:
        # o PNG tem bordas serrilhadas; um desfoque leve antes do limiar dá curvas limpas
        alfa = ndi.gaussian_filter(alfa, suavizar)
    a = alfa > 0.5
    ys, xs = np.nonzero(a)
    y0, y1 = max(ys.min() - margem, 0), min(ys.max() + margem + 1, a.shape[0])
    x0, x1 = max(xs.min() - margem, 0), min(xs.max() + margem + 1, a.shape[1])
    return a[y0:y1, x0:x1]


def f(v: float) -> str:
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s


# ----------------------------------------------------------------- preenchimento
def tracar_preenchimento(mascara: np.ndarray) -> str:
    """Contorno exato (potrace) de uma máscara booleana. O potracer usa 0 como tinta."""
    curvas = potrace.Bitmap(~mascara).trace(
        turdsize=8,
        turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
        alphamax=1.1,
        opticurve=True,
        opttolerance=0.5,
    )
    d = []
    for c in curvas:
        d.append(f"M{f(c.start_point.x)} {f(c.start_point.y)}")
        for s in c.segments:
            if s.is_corner:
                d.append(f"L{f(s.c.x)} {f(s.c.y)}L{f(s.end_point.x)} {f(s.end_point.y)}")
            else:
                d.append(
                    f"C{f(s.c1.x)} {f(s.c1.y)} {f(s.c2.x)} {f(s.c2.y)} {f(s.end_point.x)} {f(s.end_point.y)}"
                )
        d.append("Z")
    return "".join(d)


# -------------------------------------------------------------------- esqueleto
def grafo(skel: np.ndarray):
    pts = set(map(tuple, np.argwhere(skel)))
    viz = {}
    for p in pts:
        ns = []
        for dy, dx in NB8:
            q = (p[0] + dy, p[1] + dx)
            if q not in pts:
                continue
            if dy and dx and ((p[0], q[1]) in pts or (q[0], p[1]) in pts):
                continue  # diagonal redundante (evita falsos cruzamentos)
            ns.append(q)
        viz[p] = ns
    return pts, viz


def tracar_ramos(pts, viz):
    nos = {p for p in pts if len(viz[p]) != 2}
    visit = set()
    ramos = []
    for n in nos:
        for q in viz[n]:
            e = frozenset((n, q))
            if e in visit:
                continue
            visit.add(e)
            cam = [n, q]
            ant, atual = n, q
            while atual not in nos:
                prox = [r for r in viz[atual] if r != ant and frozenset((atual, r)) not in visit]
                if not prox:
                    break
                r = prox[0]
                visit.add(frozenset((atual, r)))
                cam.append(r)
                ant, atual = atual, r
            ramos.append(cam)
    # laços fechados (sem pontas nem cruzamentos)
    for p in pts:
        if p in nos:
            continue
        livres = [q for q in viz[p] if frozenset((p, q)) not in visit]
        if not livres:
            continue
        cam = [p]
        ant, atual = None, p
        while True:
            prox = [r for r in viz[atual] if r != ant and frozenset((atual, r)) not in visit]
            if not prox:
                break
            r = prox[0]
            visit.add(frozenset((atual, r)))
            cam.append(r)
            ant, atual = atual, r
            if r == p:
                break
        if len(cam) > 2:
            ramos.append(cam)
    return ramos


def podar(skel: np.ndarray, comp_min: float, voltas: int = 6) -> np.ndarray:
    """Remove esporas curtas (ramos terminais menores que comp_min)."""
    skel = skel.copy()
    for _ in range(voltas):
        pts, viz = grafo(skel)
        mudou = False
        for cam in tracar_ramos(pts, viz):
            a, b = cam[0], cam[-1]
            ga, gb = len(viz[a]), len(viz[b])
            terminal = (ga == 1 and gb >= 3) or (gb == 1 and ga >= 3)
            if terminal and len(cam) < comp_min:
                for p in cam:
                    if len(viz[p]) < 3:
                        skel[p] = False
                mudou = True
        if not mudou:
            break
    return skel


def rdp(pts: list[tuple[float, float]], eps: float):
    if len(pts) < 3:
        return pts
    a, b = np.array(pts[0]), np.array(pts[-1])
    ab = b - a
    n = np.hypot(*ab)
    arr = np.array(pts)
    if n == 0:
        dist = np.hypot(*(arr - a).T)
    else:
        dist = np.abs(ab[0] * (arr[:, 1] - a[1]) - ab[1] * (arr[:, 0] - a[0])) / n
    i = int(np.argmax(dist))
    if dist[i] > eps:
        return rdp(pts[: i + 1], eps)[:-1] + rdp(pts[i:], eps)
    return [pts[0], pts[-1]]


def caminho_suave(pts: list[tuple[float, float]], fechado: bool = False, canto_graus: float = 55) -> str:
    """Catmull-Rom → Bézier cúbica, preservando cantos vivos."""
    if len(pts) == 2:
        (x0, y0), (x1, y1) = pts
        return f"M{f(x0)} {f(y0)}L{f(x1)} {f(y1)}"
    P = [np.array(p, float) for p in pts]
    if fechado and np.allclose(P[0], P[-1]):
        P = P[:-1]
    n = len(P)

    def canto(i: int) -> bool:
        if not fechado and (i == 0 or i == n - 1):
            return True
        a, b, c = P[(i - 1) % n], P[i], P[(i + 1) % n]
        v1, v2 = b - a, c - b
        if np.hypot(*v1) == 0 or np.hypot(*v2) == 0:
            return True
        cosang = np.dot(v1, v2) / (np.hypot(*v1) * np.hypot(*v2))
        return math.degrees(math.acos(max(-1, min(1, cosang)))) > canto_graus

    def tang(i: int):
        if canto(i):
            return np.zeros(2)
        return (P[(i + 1) % n] - P[(i - 1) % n]) / 6

    d = [f"M{f(P[0][0])} {f(P[0][1])}"]
    segs = n if fechado else n - 1
    for i in range(segs):
        j = (i + 1) % n
        c1 = P[i] + tang(i)
        c2 = P[j] - tang(j)
        d.append(f"C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(P[j][0])} {f(P[j][1])}")
    if fechado:
        d.append("Z")
    return "".join(d)


def esqueleto_em_ramos(mascara: np.ndarray, comp_min: float, eps: float):
    skel = skeletonize(mascara)
    skel = podar(skel, comp_min)
    pts, viz = grafo(skel)
    ramos = []
    for cam in tracar_ramos(pts, viz):
        xy = [(p[1] + 0.5, p[0] + 0.5) for p in cam]
        fechado = len(cam) > 3 and cam[0] == cam[-1]
        ramos.append({"pts": rdp(xy, eps), "pix": cam, "fechado": fechado})
    return ramos


def estender(pts, d_ini: float, d_fim: float):
    """Prolonga as pontas de uma polilinha aberta ao longo da tangente."""
    if len(pts) < 2:
        return pts
    pts = list(pts)
    (x0, y0), (x1, y1) = pts[0], pts[1]
    n = math.hypot(x0 - x1, y0 - y1)
    if n > 0:
        pts.insert(0, (x0 + (x0 - x1) / n * d_ini, y0 + (y0 - y1) / n * d_ini))
    (xa, ya), (xb, yb) = pts[-2], pts[-1]
    n = math.hypot(xb - xa, yb - ya)
    if n > 0:
        pts.append((xb + (xb - xa) / n * d_fim, yb + (yb - ya) / n * d_fim))
    return pts


def comprimento(pts) -> float:
    return float(sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)))


# ------------------------------------------------------------- logos (máscara)
def ordenar_ramos(ramos):
    """Ordem de 'escrita': o ramo mais longo primeiro, partindo da ponta mais alta/à esquerda;
    depois os demais, cada um partindo da ponta mais próxima do que já foi desenhado."""
    if not ramos:
        return []
    restantes = sorted(ramos, key=lambda r: -comprimento(r["pts"]))
    prim = restantes.pop(0)
    a, b = prim["pts"][0], prim["pts"][-1]
    if (b[1] + 0.35 * b[0]) < (a[1] + 0.35 * a[0]):
        prim["pts"] = prim["pts"][::-1]
        prim["pix"] = prim["pix"][::-1]
    ordem = [prim]
    desenhados = list(prim["pts"])
    while restantes:
        def dist_min(r):
            ini, fim = r["pts"][0], r["pts"][-1]
            di = min(math.dist(ini, q) for q in desenhados)
            df = min(math.dist(fim, q) for q in desenhados)
            return min(di, df), di <= df

        restantes.sort(key=lambda r: dist_min(r)[0])
        r = restantes.pop(0)
        _, ini_mais_perto = dist_min(r)
        if not ini_mais_perto:
            r["pts"] = r["pts"][::-1]
            r["pix"] = r["pix"][::-1]
        ordem.append(r)
        desenhados.extend(r["pts"])
    return ordem


def vetorizar_logo(nome: str, girar_ccw: bool, ordenar_por: str, suavizar: float = 2.2):
    a = carregar(nome, girar_ccw, suavizar=suavizar)
    h, w = a.shape
    dt = ndi.distance_transform_edt(a)
    rot = label(a, connectivity=2)
    regioes = [r for r in regionprops(rot) if r.area > 60]
    if ordenar_por == "x":
        regioes.sort(key=lambda r: r.bbox[1])
    else:  # leitura de cima para baixo e depois da esquerda para a direita
        regioes.sort(key=lambda r: (r.bbox[0], r.bbox[1]))
    partes = []
    for r in regioes:
        m = rot == r.label
        espessura = float(dt[m].max() * 2)
        ramos = esqueleto_em_ramos(m, comp_min=max(espessura * 0.9, 12), eps=1.4)
        ramos = [rm for rm in ramos if comprimento(rm["pts"]) > espessura * 0.35]
        esq = []
        for rm in ordenar_ramos(ramos):
            raio = max(float(dt[p]) for p in rm["pix"]) if rm["pix"] else espessura / 2
            pts = rm["pts"]
            if not rm["fechado"]:
                pts = estender(pts, float(dt[rm["pix"][0]]) + 6, float(dt[rm["pix"][-1]]) + 6)
            esq.append({
                "d": caminho_suave(pts, rm["fechado"]),
                "sw": round(raio * 2 + 8, 1),
                "len": round(comprimento(pts), 1),
            })
        y0, x0, y1, x1 = r.bbox
        partes.append({
            "d": tracar_preenchimento(m),
            "bbox": [int(x0), int(y0), int(x1 - x0), int(y1 - y0)],
            "esqueletos": esq,
        })
    return {"viewBox": [0, 0, w, h], "partes": partes}, a


# ---------------------------------------------------------------- mural (linha)
# Regiões aproximadas de cada elemento na METADE ESQUERDA da arte girada (a direita é espelhada).
# (nome, x0, y0, x1, y1) — testadas na ordem; ver previas/mural-grupos.png
REGIOES_MURAL = [
    ("borda", 0, 0, 118, 1984),
    ("ceu", 125, 230, 370, 508),
    ("onda", 185, 670, 270, 1245),
    ("xicara", 170, 1195, 335, 1398),
    ("prateleira", 135, 1394, 425, 1580),
    ("suporte", 135, 1700, 345, 1890),
    ("ramo", 390, 370, 700, 705),
    ("escada", 540, 712, 662, 1455),
    ("arco", 140, 505, 505, 1475),
    ("mobilia", 350, 1320, 1000, 1910),
]
ORDEM_MURAL = ["borda", "arco", "onda", "xicara", "prateleira", "suporte", "escada", "ramo", "ceu", "mobilia"]


def classificar(cx: float, cy: float, largura_total: float):
    lado = "esq" if cx < largura_total / 2 else "dir"
    x = cx if lado == "esq" else largura_total - cx
    for nome, x0, y0, x1, y1 in REGIOES_MURAL:
        if x0 <= x <= x1 and y0 <= cy <= y1:
            return nome, lado
    return "outros", lado


def vetorizar_mural(nome: str):
    a = carregar(nome, girar_ccw=True)
    h, w = a.shape
    dt = ndi.distance_transform_edt(a)
    largura = float(np.median(dt[skeletonize(a)]) * 2)
    # pontos cheios (bolinhas na ponta dos raminhos): ficam numa PONTA do esqueleto
    # e são bem mais grossos que a linha. Cruzamentos grossos no meio do traço são ignorados.
    skel0 = podar(skeletonize(a), largura * 2.2)
    pts0, viz0 = grafo(skel0)
    pontas = [p for p in pts0 if len(viz0[p]) == 1]
    pontos = []
    sem_pontos = a.copy()
    yy, xx = np.ogrid[:h, :w]
    vistos = []
    for (py, px) in pontas:
        y0, y1 = max(py - 14, 0), min(py + 15, h)
        x0, x1 = max(px - 14, 0), min(px + 15, w)
        janela = dt[y0:y1, x0:x1]
        iy, ix = np.unravel_index(int(np.argmax(janela)), janela.shape)
        raio = float(janela[iy, ix])
        if raio < largura * 0.5 * 1.4:
            continue
        cy, cx = y0 + iy, x0 + ix
        if any(math.dist((cy, cx), v) < raio * 1.5 for v in vistos):
            continue
        vistos.append((cy, cx))
        pontos.append({"cx": round(cx + 0.5, 1), "cy": round(cy + 0.5, 1), "r": round(raio + 0.5, 1)})
        sem_pontos[(yy - cy) ** 2 + (xx - cx) ** 2 <= (raio + 1.5) ** 2] = False
    ramos = esqueleto_em_ramos(sem_pontos, comp_min=largura * 2.2, eps=1.1)
    ramos = [r for r in ramos if comprimento(r["pts"]) > largura * 1.2]
    tracos = []
    for r in ramos:
        pts = r["pts"]
        # a "caneta" começa pela ponta mais alta (empate: a mais à esquerda)
        if (pts[-1][1], pts[-1][0]) < (pts[0][1], pts[0][0]) and not r["fechado"]:
            pts = pts[::-1]
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        bbox = [round(min(xs), 1), round(min(ys), 1), round(max(xs), 1), round(max(ys), 1)]
        grupo, lado = classificar((bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2, w)
        tracos.append({
            "d": caminho_suave(pts, r["fechado"]),
            "bbox": bbox,
            "len": round(comprimento(pts), 1),
            "grupo": grupo,
            "lado": lado,
        })
    for p in pontos:
        p["grupo"], p["lado"] = classificar(p["cx"], p["cy"], w)
    ordem = {g: i for i, g in enumerate(ORDEM_MURAL)}
    tracos.sort(key=lambda t: (ordem.get(t["grupo"], 99), t["lado"], t["bbox"][1], t["bbox"][0]))
    return {"viewBox": [0, 0, w, h], "largura": round(largura, 2), "ordem": ORDEM_MURAL,
            "tracos": tracos, "pontos": pontos}, a


# ------------------------------------------------------------------- prévias
def previa_logo(dados, a, nome):
    w, h = dados["viewBox"][2], dados["viewBox"][3]
    esc = 900 / max(w, h)
    im = Image.new("RGB", (int(w * esc) + 1, int(h * esc) + 1), "white")
    base = Image.fromarray((~a * 255).astype(np.uint8)).resize(im.size)
    im.paste(Image.blend(base.convert("RGB"), Image.new("RGB", im.size, "white"), 0.75))
    dr = ImageDraw.Draw(im)
    cores = ["#b26a5b", "#f1a500", "#2b6cb0", "#2f855a", "#9b2c2c", "#6b46c1"]
    for i, p in enumerate(dados["partes"]):
        for j, e in enumerate(p["esqueletos"]):
            pts = [(float(x) * esc, float(y) * esc) for x, y in _pontos_do_d(e["d"])]
            if len(pts) > 1:
                dr.line(pts, fill=cores[(i + j) % len(cores)], width=3)
                dr.ellipse([pts[0][0] - 5, pts[0][1] - 5, pts[0][0] + 5, pts[0][1] + 5], fill="black")
    im.save(PREVIAS / f"{nome}.png")


def _pontos_do_d(d: str):
    import re
    nums = [float(v) for v in re.findall(r"-?\d+(?:\.\d+)?", d)]
    return list(zip(nums[0::2], nums[1::2]))


def previa_mural(dados, a):
    w, h = dados["viewBox"][2], dados["viewBox"][3]
    esc = 1400 / max(w, h)
    cores = {"borda": "#888888", "ceu": "#2b6cb0", "onda": "#b26a5b", "xicara": "#9b2c2c",
             "prateleira": "#6b46c1", "suporte": "#6b46c1", "ramo": "#2f855a", "escada": "#d69e2e",
             "arco": "#2b211c", "mobilia": "#dd6b20", "outros": "#ff00ff"}
    im = Image.new("RGB", (int(w * esc) + 1, int(h * esc) + 1), "white")
    dr = ImageDraw.Draw(im)
    for t in dados["tracos"]:
        pts = [(x * esc, y * esc) for x, y in _pontos_do_d(t["d"])]
        dr.line(pts, fill=cores.get(t["grupo"], "#ff00ff"), width=3)
        dr.ellipse([pts[0][0] - 3, pts[0][1] - 3, pts[0][0] + 3, pts[0][1] + 3], fill="black")
    for p in dados["pontos"]:
        r = p["r"] * esc
        dr.ellipse([p["cx"] * esc - r, p["cy"] * esc - r, p["cx"] * esc + r, p["cy"] * esc + r],
                   fill=cores.get(p["grupo"], "#ff00ff"))
    im.save(PREVIAS / "mural-grupos.png")
    contagem = {}
    for t in dados["tracos"]:
        contagem[t["grupo"]] = contagem.get(t["grupo"], 0) + 1
    print("grupos do mural:", contagem)


def main():
    SAIDA.mkdir(parents=True, exist_ok=True)
    PREVIAS.mkdir(parents=True, exist_ok=True)

    mono, a = vetorizar_logo("cremalab logo1r.png", girar_ccw=False, ordenar_por="yx")
    (SAIDA / "monograma.json").write_text(json.dumps(mono, ensure_ascii=False))
    previa_logo(mono, a, "monograma")

    wm, a = vetorizar_logo("cremalab logo2.png", girar_ccw=True, ordenar_por="x")
    (SAIDA / "wordmark.json").write_text(json.dumps(wm, ensure_ascii=False))
    previa_logo(wm, a, "wordmark")

    mural, a = vetorizar_mural("cremalab parts1.png")
    (SAIDA / "mural.json").write_text(json.dumps(mural, ensure_ascii=False))
    previa_mural(mural, a)

    for k, v in {"monograma": mono, "wordmark": wm}.items():
        print(k, "viewBox", v["viewBox"], "partes", len(v["partes"]),
              "esqueletos", [len(p["esqueletos"]) for p in v["partes"]])
    print("mural viewBox", mural["viewBox"], "largura", mural["largura"],
          "traços", len(mural["tracos"]), "pontos", len(mural["pontos"]))


if __name__ == "__main__":
    main()
