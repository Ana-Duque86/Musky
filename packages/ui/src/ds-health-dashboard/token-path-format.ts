/** Convierte ruta lógica de token (p. ej. `semantic/text/primary`) al nombre de custom property en CSS. */
export function tokenPathToCssVar(path: string): string {
  return `--${path.replace(/\//g, "-")}`;
}
