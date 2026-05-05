# Figma — contrato Musky (variables y estilos)

Referencia para la coleccion **Musky — UI Tokens** y estilos locales en el archivo **Components**. Complementa `docs/foundations/typography-system.md` (modelo de tres capas y rampa tipografica).

## Principios

1. **Tipografia base** vive en `typography/*` (display, heading, body, label, caption, overline). Son tokens atomicos por rampa: `fontSize`, `lineHeight`, `fontWeight`, `letterSpacing` donde aplique.
2. **No** crear ramas paralelas tipo `typography/button/*` ni duplicar metricas de texto bajo `component/button/label/*`. El boton enlaza `typography/label/md/*` o `sm`; el color de enlace usa `semantic/action/link/text`.
3. **Component** (`component/*`) guarda layout, color de superficie del componente, radios de UI y foco — no una segunda rampa tipografica con el mismo significado que `typography/label/*`.

## Estilos de texto locales

| Nombre | Uso |
| --- | --- |
| `Musky/Typography/Display` … `Musky/Typography/Overline` | Rampa visual base; aplicar a contenido y labels genericos. |
| `Musky/Typography/Label Small` | Chips, iniciales compactos (p. ej. avatar en Header). |
| `Musky/Typography/Body Link` | **Solo variante `Button / Link`**: mismas metricas que Body (16/24), **Bold**, **subrayado**. No sustituye a `Body` en texto corrido; es el aspecto de accion tipo enlace del boton. |

Los enlaces en parrafo (`.musky-text--link` en codigo) siguen **Body** + medium + color de enlace + subrayado; no estan obligados a usar `Body Link`.

## Variables eliminadas o prohibidas (legacy)

Quitar del archivo si reaparecen por merge:

- `typography/button/*` (sustituido por `typography/label/md|sm` y color semantico).
- `component/button/label/md/fontSize|lineHeight` (duplicaba label; enlazar `typography/label/md/*` desde el texto del boton).

## Segmentacion — SegmentedControl

En Figma, capas del component set **SegmentedControl** enlazan:

| Capa | Variable tipica |
| --- | --- |
| Contenedor (`Segmented body`) | `component/segmentedControl/bg`, `component/segmentedControl/border`, `radius/full` |
| Opcion activa | `semantic/segment/selected/bg`, `semantic/segment/selected/text` |
| Opcion inactiva | `semantic/segment/unselected/bg`, `semantic/segment/unselected/text` |
| Fondo icono (`Icon bg`) | `semantic/background/surfaceAlt`, `radius/full` |

El estado activo por variante sigue el nombre del componente (`active=dog` / `active=cat`): Perro vs Gato reciben selected/unselected segun corresponda.

En codigo, `--component-segmented-control-option-active-*` alias a tokens de accion seleccionada (`semantic-action-selected-*`), alineado en intencion con `semantic/segment/selected/*` en Figma.

## Header — saludo

- **Iniciales** (`Initials / fallback`): estilo `Musky/Typography/Label Small`.
- **Saludo con nombre**: una sola capa **TEXT** con **pesos mixtos** — `¡Hola ` en **Regular**, nombre y `!` en **Bold** (rangos de fuente en la misma capa), o dos capas equivalentes en codigo (`musky-header__greeting-regular` + `musky-header__greeting-name`).
- Variante solo `¡Hola!`: todo **Regular**.

## QA rapido en Figma

- Boton **link**: texto usa **Body Link** (bold + underline), no solo `Body` plano.
- **SegmentedControl**: inspector muestra variables en fills de contenedor, opciones y color de `Label`.
- **Header**: saludo muestra dos pesos visibles cuando hay nombre.

## Referencias de codigo

| Tema | Ruta |
| --- | --- |
| Tokens CSS | `packages/ui/src/styles/tokens.css` |
| Tipografia utilitaria | `packages/ui/src/styles/typography.css` |
| Button link | `packages/ui/src/components/Button/Button.css` (`.musky-button--link`) |
| Header saludo | `packages/ui/src/components/Header/Header.tsx`, `Header.css` |
| SegmentedControl | `packages/ui/src/components/SegmentedControl/SegmentedControl.css` |
