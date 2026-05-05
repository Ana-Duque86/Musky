# SegmentedControl

## Overview

SegmentedControl es un control de seleccion unica para elegir entre opciones mutuamente excluyentes. En Musky se usa principalmente para seleccion de tipo de mascota, por ejemplo `Perro` o `Gato`.

Forma parte del Button System porque representa una accion de seleccion persistente.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Group | Container | Si | default / focus | Contenedor del radiogroup |
| Option | Button radio | Si | active / inactive | Opcion seleccionable |
| Label | Text | Si | short | Nombre visible de la opcion |
| Icon | Text/Icon | Opcional | emoji / icon | Refuerzo visual |
| Focus ring | State | Si | focus | Ring externo de 2px por opcion |

### Properties

| Property | Valores |
| --- | --- |
| `selection` | `single` |
| `active` | `true` / `false` |
| `state` | `default` / `disabled` / `focus` |
| `options` | array |
| `value` | string |

### States

| Estado | Descripcion |
| --- | --- |
| Default | Grupo interactivo |
| Active | Opcion seleccionada |
| Disabled | Opcion no disponible |
| Focus | Opcion enfocada con ring externo de 2px |

## AI Spec

### Objetivo

Permitir elegir una opcion entre varias opciones equivalentes y mutuamente excluyentes.

### Cuando usarlo

- Seleccion de tipo de mascota.
- Categorias de una misma dimension.
- Alternativas pequenas y visibles a la vez.

### Cuando no usarlo

- Acciones independientes.
- Listas largas.
- Multi-select.
- Navegacion entre paginas no relacionada con seleccion de valor.

### Content Rules

- Labels cortos.
- Opciones en orden visual y DOM equivalente.
- No depender solo del color para comunicar seleccion.
- El grupo debe tener label accesible.

## Use Cases

### Generic

| Tipo | Uso |
| --- | --- |
| Single choice | Elegir una opcion activa |
| Category selector | Cambiar contexto de contenido |
| Toggle group | Alternativas compactas |

### Producto Musky

| Caso | Como aplica |
| --- | --- |
| Pet type | `Perro` o `Gato` |
| Onboarding | Seleccion inicial antes de continuar |
| Disabled option | Tipo no disponible temporalmente |

## Data Model

| Field | Type | Example | How it applies |
| --- | --- | --- | --- |
| `selection_value` | string | `perro` | Valor actualmente seleccionado. |
| `selection_options` | array | `["perro", "gato"]` | Opciones renderizadas en el grupo. |
| `is_selected` | boolean | `true` | Estado activo de cada opcion. |
| `is_available` | boolean | `true` | Define si la opcion esta habilitada. |

## Tokens

### Codigo (CSS)

| Token CSS | Resuelve a |
| --- | --- |
| `--component-segmented-control-bg` | `semantic-background-surface` |
| `--component-segmented-control-border` | `semantic-border-subtle` |
| `--component-segmented-control-radius` | `radius-full` |
| `--component-segmented-control-option-text` | `semantic-text-secondary` |
| `--component-segmented-control-option-active-bg` | `semantic-action-selected-bg` |
| `--component-segmented-control-option-active-text` | `semantic-action-selected-text` |
| Tipografia opciones | `--typography-label-*` (misma rampa que `typography/label/md/*` en Figma) |

### Figma (coleccion Musky — UI Tokens)

| Uso en el componente | Path de variable (enlazar en el archivo) |
| --- | --- |
| Fondo contenedor | `component/segmentedControl/bg` |
| Borde contenedor | `component/segmentedControl/border` |
| Radio (contenedor y pildoras) | `radius/full` |
| Opcion activa (fill + texto) | `semantic/segment/selected/bg`, `semantic/segment/selected/text` |
| Opcion inactiva | `semantic/segment/unselected/bg`, `semantic/segment/unselected/text` |
| Fondo circulo icono/emoji | `semantic/background/surfaceAlt` |
| Focus (segun diseno) | `component/segmentedControl/focus/ring` |

El estado activo Perro vs Gato sigue el variant del componente (`active=dog` / `active=cat`). Listado ampliado: `docs/foundations/figma-musky-contract.md`.

## Accessibility

- Group role: `radiogroup`.
- Option role: `radio`.
- Group name: `aria-label`.
- Selection: `aria-checked`.
- Position: `aria-posinset` and `aria-setsize`.
- Keyboard: options are buttons with radio semantics. Arrow-key roving focus can be added if the group becomes more complex.
- Focus: visible per option with external 2px ring.

### Internal Reading Order

| Orden | Opcion | Anuncio esperado |
| --- | --- | --- |
| 1 | Perro selected | `Perro, seleccionado, 1 de 2` |
| 2 | Gato not selected | `Gato, no seleccionado, 2 de 2` |

### QA Checklist

- El contenedor expone nombre accesible.
- Cada opcion comunica selected/not selected.
- Cada opcion comunica posicion y total.
- El orden visual coincide con el DOM.
- Focus se ve por opcion.

## Figma Contract

- SegmentedControl es component set independiente dentro de Button System.
- Variants: `state=default|focus`; opciones documentadas `Perro` y `Gato`; variant `active=dog|cat` para estado seleccionado.
- Active state debe estar representado visualmente y no solo por color.
- Focus es state real con ring externo de 2px.
- Capas del layout enlazan variables como en la tabla **Figma** arriba y en `docs/foundations/figma-musky-contract.md`.
- Text style de labels: `Musky/Typography/Label`.

## Code Contract

- Component: `packages/ui/src/components/SegmentedControl/SegmentedControl.tsx`
- Styles: `packages/ui/src/components/SegmentedControl/SegmentedControl.css`
- Metadata: `packages/ui/src/components/SegmentedControl/SegmentedControl.metadata.json`
- Props:
  - `label`
  - `options`
  - `value`
  - `onChange`

SegmentedControl is exported from `packages/ui/src/index.ts`.

Referencias Figma y variables: `docs/foundations/figma-musky-contract.md`.

## Notes And Decisions

- SegmentedControl es seleccion unica, no multi-select.
- Se documenta dentro del Button System por su relacion con acciones de seleccion.
- La lectura interna por opcion es obligatoria en la documentacion de accesibilidad.
