# Button System

## Overview

El Button System es el sistema de acciones de Musky. No documenta solo un boton aislado: agrupa CTA, acciones secundarias, acciones terciarias, link actions, icon-only actions y seleccion unica.

Su objetivo es permitir que el usuario ejecute acciones de forma clara, jerarquica y consistente.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Contenedor | Layout | Si | filled / outline / text / segmented | Base visual y area tactil |
| Label | Texto | Si, excepto icon-only | corto / largo | Accion principal |
| Icono izquierdo | Icono | Opcional | leading / none | Refuerzo visual |
| Icono derecho | Icono | Opcional | trailing / none | Accion secundaria o direccion |
| Icono unico | Icono | Solo IconButton | replaceable slot | Accion compacta |
| Background | Color | Si | primary / secondary / tertiary / selected | Estado visual |
| Estado | Logica | Si | default / pressed / disabled / loading / focus | Interaccion |

### Logical Layout

| Tipo | Composicion | Uso |
| --- | --- | --- |
| Primary | Label + background solido | Accion principal |
| Secondary | Outline + label | Accion secundaria |
| Tertiary | Wine hierarchy + label | Accion contextual de peso medio |
| Link | Texto sin contenedor solido | Accion de bajo peso o navegacion secundaria |
| IconButton | Solo icono | Acciones rapidas |
| SegmentedControl | Grupo de opciones | Seleccion unica, por ejemplo Perro/Gato |

### Properties

| Property | Valores |
| --- | --- |
| `variant` | `primary` / `secondary` / `tertiary` / `link` |
| `size` | `sm` / `md` / `lg` |
| `state` | `default` / `pressed` / `disabled` / `loading` / `focus` |
| `icon` | `none` / `left` / `right` / `only` |
| `fullWidth` | `true` / `false` |
| `badge` | `true` / `false`, solo IconButton |
| `selection` | `single`, solo SegmentedControl |
| `active` | `true` / `false`, solo SegmentedControl option |

### States

| Estado | Descripcion |
| --- | --- |
| Default | Interactivo |
| Pressed | Feedback temporal |
| Disabled | No interactivo |
| Loading | En proceso, bloquea repeticion |
| Focus | Estado real con ring externo de 2px |
| Active | Opcion seleccionada en SegmentedControl |

## AI Spec

### Objetivo

Permitir al usuario ejecutar acciones explicitas, confirmar decisiones, avanzar en flujos y cambiar estados.

### Cuando usarlo

- Ejecutar acciones explicitas.
- Confirmar decisiones.
- Avanzar en flujos, por ejemplo `Continuar`.
- Cambiar estados o seleccion.
- Exponer acciones compactas con icon-only controls.

### Cuando no usarlo

- Navegacion implicita dentro de cards.
- Acciones evidentes donde la card completa ya es clicable.
- Demasiadas acciones compitiendo en el mismo contexto.
- Variantes ghost: ghost no forma parte del sistema activo.

### Content Rules

- Un boton representa una accion clara.
- Usar labels cortos, idealmente 1-3 palabras.
- Preferir verbos como `Continuar`, `Anadir`, `Activar`.
- Evitar `Click aqui`.
- Solo debe haber un primary por pantalla o bloque de decision.
- Link button cubre acciones de bajo peso o navegacion secundaria.

## Use Cases

### Generic

| Tipo | Uso |
| --- | --- |
| Primary | Confirmar accion principal |
| Secondary | Alternativa o accion de apoyo |
| Tertiary | Accion contextual de peso medio |
| Link | Accion secundaria de bajo peso |
| IconButton | Navegacion rapida o accion compacta |
| SegmentedControl | Seleccion unica |
| Disabled | Validacion incompleta |

### Producto Musky

| Tipo | Caso |
| --- | --- |
| Primary | Continuar onboarding |
| Secondary | Cambiar opcion sin abandonar flujo |
| Tertiary | Accion wine contextual |
| Link | Saltar, ver condiciones o navegar a ayuda |
| IconButton | Volver, cerrar, notificaciones, recompensas |
| SegmentedControl | Elegir Perro o Gato |
| Disabled | Falta elegir tipo de mascota |

### Insight

Este componente es un sistema de acciones porque incluye CTA, navegacion, seleccion y estado. Las variantes visuales deben responder a prioridad de accion, no a decoracion.

## Data Model

| Field | Type | Example | How it applies |
| --- | --- | --- | --- |
| `action_id` | string | `act_continue_onboarding` | Identifica la accion para analytics, logging o ejecucion. |
| `action_label` | string | `Continuar` | Label visible y accessible name del Button. |
| `action_type` | enum | `navigation` | Define si la accion navega, envia, alterna o abre un overlay. |
| `action_state` | enum | `enabled` | Controla default, disabled o loading. |
| `action_priority` | enum | `primary` | Mapea a primary, secondary, tertiary o link. |
| `action_target` | string | `/onboarding/pet-type` | Ruta, endpoint o destino de la accion. |
| `action_payload` | object | `{ "petType": "dog" }` | Datos enviados al ejecutar la accion. |
| `selection_value` | string | `perro` | Valor activo en SegmentedControl. |
| `selection_options` | array | `["perro", "gato"]` | Opciones disponibles del control. |
| `is_selected` | boolean | `true` | Indica la opcion activa. |
| `is_available` | boolean | `false` | Permite deshabilitar acciones u opciones. |

## Tokens

### Semantic

| Token | Uso |
| --- | --- |
| `semantic/action/primary/bg` | Fondo primary |
| `semantic/action/primary/text` | Texto primary |
| `semantic/action/secondary/bg` | Fondo secondary |
| `semantic/action/secondary/text` | Texto secondary |
| `semantic/action/secondary/border` | Borde secondary |
| `semantic/action/tertiary/bg` | Fondo tertiary wine |
| `semantic/action/tertiary/text` | Texto tertiary |
| `semantic/action/tertiary/border` | Borde tertiary |
| `semantic/action/link/text` | Texto link |
| `semantic/action/selected/bg` | Fondo de opcion seleccionada (SegmentedControl en codigo) |
| `semantic/action/selected/text` | Texto de opcion seleccionada |
| `semantic/action/disabled/bg` | Fondo disabled |
| `semantic/action/disabled/text` | Texto disabled |
| `semantic/focus/ring` | Color del focus ring |
| `semantic/focus/ringOffset` | Offset de focus, 2px |

### Typography

| Token (Figma / codigo) | Uso |
| --- | --- |
| `typography/fontFamily/primary` | Familia base |
| `typography/label/md/fontSize` | Label botones md/lg (`--typography-label-*`) |
| `typography/label/md/lineHeight` | Line-height label md |
| `typography/label/md/fontWeight` | Peso label (medium en codigo) |
| `typography/label/sm/fontSize` | Boton `sm` |
| `typography/label/sm/lineHeight` | Line-height compacto |

Las metricas `typography/link/*` en codigo son **alias de Body md** para la variante link; no mantener paths duplicados `typography/button/*` en Figma.

### Component

| Token | Uso |
| --- | --- |
| `component/button/primary/*` | Button primary |
| `component/button/secondary/*` | Button secondary |
| `component/button/tertiary/*` | Button tertiary wine |
| `component/button/link/text` | Color texto boton link (alias semantico en CSS) |
| `component/button/disabled/*` | Button disabled |
| `component/button/focus/ring` | Button focus |
| `component/iconButton/primary/*` | IconButton primary |
| `component/iconButton/secondary/*` | IconButton secondary default |
| `component/iconButton/tertiary/*` | IconButton tertiary wine |
| `component/iconButton/badge/*` | Notification badge |
| `component/iconButton/focus/ring` | IconButton focus |
| `component/segmentedControl/*` | Shell SegmentedControl |
| `component/segmentedControl/focus/ring` | Option focus |

No usar `component/button/label/md/*` para fontSize/lineHeight (eliminado; enlazar `typography/label/md/*`).

### Estilos de texto Figma (Button)

| Variante | Estilo local |
| --- | --- |
| Primary / secondary / tertiary | `Musky/Typography/Label` |
| Link | `Musky/Typography/Body Link` (Body 16/24, Bold, subrayado) |

## Accessibility

### Button

- Role: native `button`.
- Accessible name: visible label.
- Loading: use `aria-busy` and disable repeat activation.
- Disabled: native `disabled` removes it from tab order.
- Keyboard: Enter and Space activate.
- Focus: visible ring with 2px external offset.

### IconButton

- Role: native `button`.
- Accessible name: required `aria-label`.
- Badge: decorative. If it communicates quantity, include it in `aria-label`, for example `Abrir notificaciones, 2 pendientes`.
- Keyboard: Enter and Space activate.
- Focus: visible ring with 2px external offset.

### SegmentedControl

- Role: `radiogroup`.
- Options: role `radio`.
- Use `aria-checked`, `aria-posinset` and `aria-setsize`.
- Internal reading order: `Perro, seleccionado, 1 de 2`; then `Gato, no seleccionado, 2 de 2`.
- Active state cannot rely on color alone.
- Focus is per option and visible with 2px external offset.

### QA Checklist

- Primary is not duplicated in the same decision area.
- Ghost does not appear as active variant.
- Icon-only actions include `aria-label`.
- Disabled and loading states cannot trigger duplicate actions.
- Focus is visible on keyboard navigation.
- SegmentedControl exposes selected state and option position.

## Figma Contract

- Page: `Button`.
- Component sets: `Button`, `Button / Link`, `IconButton`, `SegmentedControl`.
- `Button` variants: `variant=primary|secondary|tertiary`, `state=default|disabled|focus`, plus loading/pressed where needed.
- `Button / Link`: texto con estilo **`Musky/Typography/Body Link`** (no solo `Body` plano).
- `IconButton` variants: `variant=primary|secondary|tertiary`, `state=default|focus`, `badge=true|false`.
- `SegmentedControl` variants: `state=default|focus`, options `Perro` and `Gato`; variables en capas segun `docs/foundations/figma-musky-contract.md`.
- Focus state is a real component state with visual ring offset of 2px.
- IconButton secondary is the default hierarchy.
- Referencia de variables y paths prohibidos: `docs/foundations/figma-musky-contract.md`.

## Code Contract

- `Button`: `packages/ui/src/components/Button/Button.tsx`
- `IconButton`: `packages/ui/src/components/IconButton/IconButton.tsx`
- `SegmentedControl`: `packages/ui/src/components/SegmentedControl/SegmentedControl.tsx`
- Stories: `Button.stories.tsx`, `IconButton.stories.tsx`, `SegmentedControl.stories.tsx`
- Metadata: `Button.metadata.json`, `IconButton.metadata.json`, `SegmentedControl.metadata.json`
- Public exports: `packages/ui/src/index.ts`

### Props

- `Button.variant`: `primary | secondary | tertiary | link`
- `Button.size`: `sm | md | lg`
- `Button.fullWidth`: boolean
- `Button.loading`: boolean
- `Button.leadingIcon` / `trailingIcon`: optional slots
- `IconButton.variant`: `primary | secondary | tertiary`
- `IconButton.badge`: boolean
- `IconButton.label`: required accessible label
- `SegmentedControl.options`: array of options
- `SegmentedControl.value`: selected value

## Notes And Decisions

- Ghost is intentionally excluded.
- Link button replaces the low-emphasis action need originally covered by ghost.
- Wine-colored action is `tertiary` for Button and IconButton.
- IconButton mirrors Button hierarchy: primary, secondary and tertiary.
- IconButton secondary is the default.
- SegmentedControl is part of the Button System because it represents selection actions.
- Focus is not an overlay annotation; it is a real state/variant.
