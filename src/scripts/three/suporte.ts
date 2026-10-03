// WebGL2 disponível e o aparelho aguenta? (economia de dados e aparelhos fracos ficam com o fallback)
export function suporta3d() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2');
    if (!gl) return false;
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return false;
    if ((nav.hardwareConcurrency ?? 8) <= 2 && (nav.deviceMemory ?? 8) <= 2) return false;
    return true;
  } catch {
    return false;
  }
}
