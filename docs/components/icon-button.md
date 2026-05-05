# IconButton

## Overview

IconButton es un boton circular icon-only para acciones compactas. Replica la jerarquia visual de `Button`: `primary`, `secondary` y `tertiary`.

Secondary es la variante por defecto. El badge es una propiedad booleana del mismo componente, no un componente aparte.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Container | Button | Si | primary / secondary / tertiary | Area tactil circular |
| Icon | Slot | Si | replaceable | Icono visual decorativo |
| Badge | Boolean | Opcional | true / false | Indicador de notificacion |
| Focus ring | State | Si | focus | Ring externo de 2px |

### Properties

| Property | Valores |
| --- | --- |
| `variant` | `primary` / `secondary` / `tertiary` |
| `badge` | `true` / `false` |
| `icon` | replaceable slot |
| `label` | string required |

### States

| Estado | Descripcion |
| --- | --- |
| Default | Accion disponible |
| Focus | Ring externo de 2px |
| Badge | Indicador visual activo |

## AI Spec

### Objetivo

Permitir acciones rapidas en espacios reducidos sin perder jerarquia visual ni accesibilidad.

### Cuando usarlo

- Notificaciones.
- Recompensas.
- Cerrar o volver.
- Acciones compactas con icono universal o suficientemente reconocido.

### Cuando no usarlo

- Acciones que necesitan explicacion textual.
- Acciones principales donde el label debe estar visible.
- Variantes separadas para badge on/off.

### Content Rules

- Siempre requiere `label`.
- El icono es decorativo y debe tener `aria-hidden`.
- Si el badge comunica cantidad o estado, incluirlo en el label.

## Use Cases

### Generic

| Tipo | Uso |
| --- | --- |
| Primary | Accion icon-only de maxima prioridad |
| Secondary | Accion icon-only por defecto |
| Tertiary | Accion wine de peso medio |
| Badge | Notificacion pendiente |

### Producto Musky

| Caso | Como aplica |
| --- | --- |
| Notifications | Campana con badge booleano |
| Rewards | Regalo o premio sin badge |
| Header actions | Acciones compactas dentro del Header |

## Data Model

| Field | Type | Example | How it applies |
| --- | --- | --- | --- |
| `action_id` | string | `act_open_notifications` | Identifica la accion icon-only. |
| `action_label` | string | `Abrir notificaciones` | Se usa como `aria-label`. |
| `action_type` | enum | `navigation` | Define comportamiento de click. |
| `action_priority` | enum | `secondary` | Mapea a variante visual. |
| `notifications_count` | number | `2` | Activa badge y se incluye en label si aplica. |

## Tokens

| Token | Uso |
| --- | --- |
| `component/iconButton/size/md` | Tamano del contenedor |
| `component/iconButton/iconSize/md` | Tamano del icono |
| `component/iconButton/primary/bg` | Fondo primary |
| `component/iconButton/primary/border` | Borde primary |
| `component/iconButton/primary/icon` | Color icon primary |
| `component/iconButton/secondary/bg` | Fondo secondary |
| `component/iconButton/secondary/border` | Borde secondary |
| `component/iconButton/secondary/icon` | Color icon secondary |
| `component/iconButton/tertiary/bg` | Fondo tertiary wine |
| `component/iconButton/tertiary/border` | Borde tertiary |
| `component/iconButton/tertiary/icon` | Color icon tertiary |
| `component/iconButton/badge/bg` | Fondo badge |
| `component/iconButton/badge/border` | Borde badge |
| `component/iconButton/focus/ring` | Focus ring |

## Accessibility

- Role: native `button`.
- Accessible name: `aria-label` obligatorio.
- Icono: `aria-hidden="true"`.
- Badge: decorativo; no recibe foco.
- Si el badge representa cantidad, label esperado: `Abrir notificaciones, 2 pendientes`.
- Keyboard: Enter y Space.
- Focus: ring visible con offset externo de 2px.

### Reading Order

| Orden | Elemento | Anuncio esperado |
| --- | --- | --- |
| 1 | Rewards | `Abrir recompensas, boton` |
| 2 | Notifications with badge | `Abrir notificaciones, 2 pendientes, boton` |

### QA Checklist

- No existe variante `default`; usar `secondary`.
- Primary, secondary y tertiary existen como jerarquia completa.
- El badge es boolean property.
- El badge no se anuncia separado.
- Todo icon-only button tiene `aria-label`.

## Figma Contract

- IconButton es component set independiente.
- Variants: `variant=primary|secondary|tertiary`.
- Booleans: `badge=true|false`.
- Icon slot reemplazable.
- Focus es variant/state real con ring externo de 2px.
- Header debe componer instancias de IconButton.

## Code Contract

- Component: `packages/ui/src/components/IconButton/IconButton.tsx`
- Styles: `packages/ui/src/components/IconButton/IconButton.css`
- Metadata: `packages/ui/src/components/IconButton/IconButton.metadata.json`
- Props:
  - `label`
  - `icon`
  - `variant`
  - `badge`
  - `onClick`

IconButton is exported from `packages/ui/src/index.ts`.

## Notes And Decisions

- IconButton replica la jerarquia de Button.
- `secondary` es el default.
- El wine-colored IconButton es `tertiary`.
- Notificaciones no requiere componente aparte; badge es propiedad booleana.
