# Typography System

## Overview

Typography System define la jerarquia visual y la legibilidad del contenido en toda la interfaz. Los componentes consumen **estilos tipograficos base** y **tokens semanticos de color**; no duplican rampas como “Button Text” o “Link Text” como si fueran estilos distintos del sistema base.

El modelo tiene **tres capas** (visual base, rol semantico, binding en componente). La IA y los datos deben separar **que comunica** (`text_role`), **que componente lo muestra**, y **que estilo base aplica** (`text_type`).

## Tres capas

### Capa 1 — Typography Styles (base)

Define **solo como se ve** el texto: familia, tamano, peso, interlineado, tracking. Sin contexto de componente.

Ejemplos en codigo y Figma: Display, H1, H2, H3, Body Large, Body, Body Small, Label, Label Small, Caption, Overline.

### Capa 2 — Text roles (semantica)

Describe **para que sirve** el texto (intencion), no el diseno pixel a pixel.

| Rol (`text_role`) | Suele usar estilo base |
| --- | --- |
| title | Display / H1 / H2 |
| subtitle | H2 / H3 |
| description | Body Large / Body |
| action | Label |
| metadata | Caption |
| status | Label Small / Overline |
| helper | Body Small / Caption |
| error | Caption + color error |

### Capa 3 — Component binding (implementacion)

Define **que estilo base y que tokens** usa cada pieza de UI.

No son estilos tipograficos extra en la rampa; son **reglas de uso**.

## Uso tipografico por componente

| Componente / pieza | Estilo base | Color / otro |
| --- | --- | --- |
| Button label | Label | `semantic/action/*` segun variante |
| Enlace en parrafo (`.musky-text--link`) | Body | Medium; `semantic/action/link/text`; subrayado |
| Button variante `link` | Body (estilo Figma **Body Link**: bold + underline) | `semantic/action/link/text` |
| Chip | Label Small u Overline | Segun tono (estado / categoria) |
| Input label | Label | Texto primario |
| Input helper | Body Small o Caption | Secundario |
| Input error | Caption | Color danger / estado error |

**Link** en texto corrido no es una fila mas en la rampa: es **Body** + medium + token de enlace + subrayado. La variante de **boton** tipo link usa el mismo cuerpo visual con **bold** y subrayado (estilo compuesto `Body Link` en Figma; ver notas finales).

## Visual Table

### Base Styles

| Estilo | Tipo | Uso | Peso | Tamano | Line height | Ejemplo |
| --- | --- | --- | --- | --- | --- | --- |
| Display | Heading | Hero / onboarding | Bold | XL | Tight | Bienvenido |
| H1 | Heading | Titulos principales | Bold | L | Tight | Mis mascotas |
| H2 | Heading | Secciones | Semibold | M | Normal | Acciones |
| H3 | Heading | Subsecciones | Semibold | M- | Normal | Vacunas |
| Body Large | Texto | Contenido principal | Regular | M | Relaxed | Texto descriptivo |
| Body | Texto | Texto estandar | Regular | Base | Normal | Descripcion |
| Body Small | Texto | Texto secundario | Regular | S | Normal | Informacion extra |
| Label | UI | Botones y controles | Medium | Base | Tight | Continuar |
| Label Small | UI | Chips, etiquetas compactas | Medium | S | Tight | Activo |
| Caption | UI | Metadata | Regular | XS | Tight | Hace 2 dias |
| Overline | UI | Categorias | Medium | XS | Tight | RECOMENDADO |

### Internal Elements

| Elemento | Tipo | Obligatorio | Descripcion |
| --- | --- | --- | --- |
| Font family | Token | Si | Tipografia base |
| Font size | Token | Si | Tamano |
| Font weight | Token | Si | Peso |
| Line height | Token | Si | Espaciado vertical |
| Letter spacing | Token | Opcional | Ajuste fino |
| Color | Token | Si | Color semantico |
| Transform | Regla | Opcional | Uppercase, etc. |

### Properties

| Property | Valores |
| --- | --- |
| `style` | `display` / `h1` / `h2` / `h3` / `body-large` / `body` / `body-small` / `label` / `label-small` / `caption` / `overline` |
| `weight` | `regular` / `medium` / `semibold` / `bold` |
| `emphasis` | `default` / `high` / `low` |
| `colorRole` | `primary` / `secondary` / `inverse` / `disabled` / `highlight` |
| `truncate` | `true` / `false` |
| `align` | `left` / `center` / `right` |

### States

| Estado | Descripcion |
| --- | --- |
| Default | Texto normal |
| Secondary | Menor jerarquia |
| Disabled | Baja visibilidad |
| Inverse | Sobre fondo oscuro |
| Highlight | Enfasis |

## AI Spec

### Objetivo

Definir la jerarquia visual y la legibilidad del contenido en toda la interfaz.

### Cuando usarlo

Siempre que haya contenido textual en la UI.

### Cuando no usarlo

Nunca usar estilos ad-hoc fuera del sistema. Si falta una necesidad, se agrega al Typography System antes de aplicarla a componentes.

### Estructura

Cada estilo tipografico base esta compuesto por:

- `font_family`
- `font_size`
- `font_weight`
- `line_height`
- `color` (semantic)
- `letter_spacing` opcional

### Reglas de contenido

- H1: titulo principal.
- H2: seccion.
- H3: subseccion o card title.
- Body: contenido explicativo.
- Caption: metadata.
- Boton: **Label** (no un “estilo boton” separado).
- Chip: **Label Small** u **Overline**.
- Link: **Body** + medium + token de enlace + subrayado.
- Cards: combinar H3 + Body.

### Reglas visuales

- Maximo 3 niveles jerarquicos visibles simultaneamente.
- Mantener consistencia entre pantallas.
- Evitar mezclar demasiados tamanos.
- Links deben diferenciarse visualmente.
- Texto nunca debe ser el unico indicador de accion.

### Flujo de datos sugerido

1. Inferir `text_role` (titulo, accion, ayuda, etc.).
2. Elegir componente o patron de UI.
3. Asignar `text_type` (estilo base) segun tablas de esta pagina, no crear tipos paralelos tipo “button text”.

## Use Cases

### Generic

| Tipo | Uso |
| --- | --- |
| Heading | Estructurar contenido |
| Body | Explicar |
| Label | Acciones |
| Caption | Metadata |
| Overline | Categorias |

### Producto Musky

| Tipo | Caso |
| --- | --- |
| H1 | Nombre de seccion, por ejemplo `Tus mascotas` |
| H2 | Agrupacion, por ejemplo `Acciones pendientes` |
| H3 | Card title, por ejemplo `Anadir microchip` |
| Body | Explicacion |
| Label | Boton, por ejemplo `Continuar` |
| Caption | Info, por ejemplo `Hace 2 dias` |
| Overline | Estado, por ejemplo `URGENTE` |

## Data Model

| Field | Type | Example | How it applies |
| --- | --- | --- | --- |
| `text_id` | string | `txt_001` | Identificador unico del texto. |
| `text_value` | string | `Hola Eduardo` | Contenido renderizado. |
| `text_type` | enum | `h1` | Estilo tipografico **base** (rampa). No usar valores tipo “button” o “link” como tipo separado: los enlaces usan `body` y el componente aplica enlace. |
| `text_priority` | enum | `high` | Jerarquia visual. |
| `text_role` | enum | `title` | Rol semantico del contenido. |
| `text_state` | enum | `default` | Estado visual del texto. |
| `text_align` | enum | `left` | Alineacion. |
| `text_truncate` | boolean | `false` | Define si el texto se corta. |
| `text_max_lines` | number | `2` | Maximo de lineas permitidas. |
| `text_emphasis` | enum | `strong` | Enfasis visual o semantico. |

## Tokens

### Font

| Token | Uso |
| --- | --- |
| `typography/fontFamily/primary` | Familia base |
| `typography/fontWeight/regular` | Peso regular |
| `typography/fontWeight/medium` | Peso medium |
| `typography/fontWeight/semibold` | Peso semibold |
| `typography/fontWeight/bold` | Peso bold |

### Styles (paquetes por rampa)

Cada rampa tiene tokens atomicos (fontSize, lineHeight, fontWeight, letterSpacing donde aplica). En CSS: `--typography-{rampa}-{propiedad}`.

| Paquete (Figma / codigo) | Uso |
| --- | --- |
| `typography/display/*` | Hero y onboarding |
| `typography/heading/h1/*`, `h2`, `h3` | Titulos (nombres en Figma) |
| `typography/body/lg/*`, `md/*`, `sm/*` | Cuerpo |
| `typography/label/md/*`, `sm/*` | UI compacta |
| `typography/caption/sm/*` | Metadata |
| `typography/overline/sm/*` | Categorias y uppercase |

Los paths `typography/button/*` y `component/button/label/*/fontSize|lineHeight` **no** deben existir: duplican `typography/label/md|sm`. Si aparecen en archivos viejos, migrar bindings y borrar (ver `docs/foundations/figma-musky-contract.md`).

### Color Roles

| Token | Uso |
| --- | --- |
| `semantic/text/primary` | Texto principal |
| `semantic/text/secondary` | Texto secundario |
| `semantic/text/disabled` | Texto deshabilitado |
| `semantic/text/inverse` | Texto sobre fondo oscuro |
| `semantic/text/highlight` | Enfasis |
| `semantic/action/link/text` | Texto de enlace |

## Accessibility

- Mantener jerarquia semantica HTML independiente del estilo visual.
- No saltar niveles de heading cuando el contenido representa estructura real.
- No depender solo del color para comunicar estado.
- Respetar truncation con titulo, aria-label o contenido accesible cuando se pierde informacion.
- Links deben ser distinguibles por mas de color cuando aparezcan dentro de texto corrido.

## Figma Contract

- **Text styles** locales para cada estilo base: `Musky/Typography/Display`, `Musky/Typography/H1`, … `Musky/Typography/Overline`.
- **No** crear estilo “Link” como rampa universal: el enlace en texto corrido combina **Body** + color `semantic/action/link/text` + subrayado en la capa.
- **Excepcion de producto:** variante **Button / Link** usa el estilo local **`Musky/Typography/Body Link`** (Body 16/24 + **Bold** + subrayado). Es el aspecto de accion tipo enlace, no una rampa paralela distinta de Body.
- Variables en la coleccion **Musky — UI Tokens**: paquetes `typography/display/*`, `typography/overline/*`, etc., alineados con los valores del codigo. No recrear `typography/button/*` ni `component/button/label/*` para metricas de texto (ver `docs/foundations/figma-musky-contract.md`).
- Componentes (Button, Header, SegmentedControl, etc.) consumen estilos globales y tokens semanticos; detalle de enlaces en Figma en esa misma pagina.

## Code Contract

- Tokens: `packages/ui/src/styles/tokens.css`
- Classes: `packages/ui/src/styles/typography.css`
- Storybook: `packages/ui/src/foundations/Typography.stories.tsx`
- Story title: `Foundations/Typography/System`
- Figma (variables y estilos): `docs/foundations/figma-musky-contract.md`

## Notes And Decisions

- La tipografia base no se define por componente.
- Button label usa tokens de **Label** (`typography/label/md/*`).
- Enlace en texto: metricas de **Body**, peso medium, `semantic/action/link/text`, subrayado (`.musky-text--link`).
- **Button** variante `link`: en Figma estilo **`Musky/Typography/Body Link`**; en CSS `.musky-button--link` usa metricas Body, **bold**, subrayado y `component-button-link-text`.
- Chip usa **Label Small** u **Overline** segun diseno.
- Input helper / error mapean a **Caption** / **Body Small** mas tokens de estado cuando existan esos componentes.
