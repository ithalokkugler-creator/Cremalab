#!/usr/bin/env python3
"""Gera um retrato em linha (SVG) a partir da foto da chef, para o efeito "do traço à foto".

Saída: src/assets/marca/retrato-chef.json  { viewBox, tracos: [{d, len}] }
Uso:   python3 scripts/marca/retrato.py
Requer: opencv-python-headless numpy scikit-image (e as funções de vetorizar.py)
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import cv2
import numpy as np
from skimage.morphology import skeletonize

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vetorizar import caminho_suave, comprimento, grafo, podar, rdp, tracar_ramos  # noqa: E402

RAIZ = Path(__file__).resolve().parents[2]
FOTO = RAIZ / "src" / "assets" / "fotos" / "chef-harlen.jpg"
SAIDA = RAIZ / "src" / "assets" / "marca" / "retrato-chef.json"


def main():
    img = cv2.imread(str(FOTO))
    h, w = img.shape[:2]
    cinza = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    cinza = cv2.bilateralFilter(cinza, 9, 60, 60)
    bordas = cv2.Canny(cinza, 40, 110)

    # recorta o fundo (janela à direita e forro no alto) — fica só a figura
    mascara = np.zeros_like(bordas)
    figura = np.array([[0, 70], [150, 18], [330, 18], [405, 120], [430, 300], [440, 604], [0, 604]], np.int32)
    cv2.fillPoly(mascara, [figura], 255)
    bordas = cv2.bitwise_and(bordas, mascara)

    n, rot, stats, _ = cv2.connectedComponentsWithStats((bordas > 0).astype(np.uint8), connectivity=8)
    limpo = np.zeros(bordas.shape, bool)
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] >= 26:
            limpo[rot == i] = True

    skel = podar(skeletonize(limpo), 6)
    pts, viz = grafo(skel)
    tracos = []
    for cam in tracar_ramos(pts, viz):
        xy = [(p[1] + 0.5, p[0] + 0.5) for p in cam]
        if comprimento(xy) < 14:
            continue
        xy = rdp(xy, 0.9)
        if (xy[-1][1], xy[-1][0]) < (xy[0][1], xy[0][0]):
            xy = xy[::-1]
        tracos.append({"d": caminho_suave(xy, False, canto_graus=70), "len": round(comprimento(xy), 1),
                       "y": round(min(p[1] for p in xy), 1)})
    # ordem de desenho: de cima para baixo (rosto primeiro)
    tracos.sort(key=lambda t: t["y"])
    SAIDA.write_text(json.dumps({"viewBox": [0, 0, w, h], "tracos": tracos}, ensure_ascii=False))
    print("retrato:", len(tracos), "traços,", sum(len(t["d"]) for t in tracos), "bytes de path")


if __name__ == "__main__":
    main()
