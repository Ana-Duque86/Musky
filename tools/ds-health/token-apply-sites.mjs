/**
 * Por cada ruta de token: sitios de uso en CSS de componentes (pieza BEM + propiedad).
 */

function selectorToUiLabel(prelude, componentKebab) {
  const first = prelude.split(",")[0].trim();
  const classes = [...first.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
  for (let i = classes.length - 1; i >= 0; i--) {
    const c = classes[i];
    const needle = `musky-${componentKebab}__`;
    const low = c.toLowerCase();
    const nlow = needle.toLowerCase();
    const ix = low.indexOf(nlow);
    if (ix !== -1) {
      let rest = c.slice(ix + needle.length);
      const modIdx = rest.indexOf("--");
      let mod = null;
      if (modIdx !== -1) {
        mod = rest.slice(modIdx + 2);
        rest = rest.slice(0, modIdx);
      }
      const base = rest.replace(/-/g, " ").trim();
      if (!base) continue;
      return mod ? `${base} (${mod.replace(/-/g, " ")})` : base;
    }
  }
  return first.replace(/\s+/g, " ").replace(/^\./, "").slice(0, 88);
}

/** Recorre reglas de primer nivel; omite bloques @ (salvo saltar el cuerpo). */
function forEachFlatRule(css, callback) {
  let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    const brace = css.indexOf("{", i);
    if (brace === -1) break;
    const prelude = css.slice(i, brace).trim();
    let depth = 1;
    let j = brace + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === "{") depth++;
      else if (css[j] === "}") depth--;
      j++;
    }
    const body = css.slice(brace + 1, j - 1);
    if (prelude.toLowerCase().startsWith("@import")) {
      const semi = css.indexOf(";", i);
      i = semi === -1 ? j : semi + 1;
      continue;
    }
    if (prelude.startsWith("@")) {
      i = j;
      continue;
    }
    callback(prelude, body);
    i = j;
  }
}

function pascalFromFileComponent(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * @param {{
 *   componentsRoot: string;
 *   listComponentNames: () => string[];
 *   walkCssFiles: (dir: string, acc: string[]) => string[];
 *   stripBlockComments: (css: string) => string;
 *   readFileSync: typeof import("node:fs").readFileSync;
 *   join: typeof import("node:path").join;
 *   cssVarToTokenPath: (v: string) => string;
 * }} opts
 */
export function buildTokenPathApplySites(opts) {
  const { componentsRoot, listComponentNames, walkCssFiles, stripBlockComments, readFileSync, join, cssVarToTokenPath } = opts;
  /** @type {Map<string, Array<{ component: string; label: string; property: string }>>} */
  const byPath = new Map();

  function add(path, site) {
    if (!byPath.has(path)) byPath.set(path, []);
    const arr = byPath.get(path);
    const key = `${site.component}|${site.label}|${site.property}`;
    if (!arr.some((s) => `${s.component}|${s.label}|${s.property}` === key)) arr.push(site);
  }

  for (const name of listComponentNames()) {
    const kebab = pascalFromFileComponent(name);
    const dir = join(componentsRoot, name);
    for (const file of walkCssFiles(dir, [])) {
      const css = stripBlockComments(readFileSync(file, "utf8"));
      forEachFlatRule(css, (prelude, body) => {
        const label = selectorToUiLabel(prelude, kebab);
        const propRe = /([a-z0-9-]+)\s*:\s*var\(\s*(--[a-z0-9-]+)/gi;
        let m;
        while ((m = propRe.exec(body))) {
          const property = m[1];
          const path = cssVarToTokenPath(m[2]);
          add(path, { component: name, label, property });
        }
      });
    }
  }

  const entries = [...byPath.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  return Object.fromEntries(entries.map(([k, v]) => [k, v]));
}

export function tokenPathUsageFromApplySites(applySites) {
  const m = new Map();
  for (const path of Object.keys(applySites)) {
    const comps = [...new Set(applySites[path].map((s) => s.component))].sort();
    m.set(path, comps);
  }
  return Object.fromEntries([...m.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}
