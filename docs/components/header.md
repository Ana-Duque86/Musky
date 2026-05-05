# Header

## Overview

Header es el app shell superior para pantallas autenticadas de Musky. Muestra saludo personalizado, avatar de usuario siempre visible, recompensas y notificaciones.

No dibuja internamente avatar ni botones de icono: compone instancias independientes de `Avatar` e `IconButton`.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Container | Layout | Si | light | Barra superior de la pantalla |
| Avatar/User | Component | Si | user | Entrada al perfil de usuario |
| Greeting | Texto | Si | name / fallback | Saludo `Hola` + nombre en bold |
| Rewards | IconButton | Opcional | visible / hidden | Entrada a recompensas |
| Notifications | IconButton | Opcional | badge true / false | Entrada a notificaciones |
| Badge | Boolean | Opcional | true / false | Indica notificaciones pendientes |

### Properties

| Property | Valores |
| --- | --- |
| `avatar` | `user` |
| `notificationsBadge` | `true` / `false` |
| `rewards` | `visible` / `hidden` |
| `theme` | `light` |

### Layout

| Property | Value |
| --- | --- |
| Height | `59px` |
| Padding X | `space-4` |
| Padding Y | `space-2` |
| Gap | `space-3` |
| Background | `semantic/background/app` |

## AI Spec

### Objetivo

Dar contexto de usuario en pantallas autenticadas y ofrecer accesos rapidos a perfil, recompensas y notificaciones.

### Cuando usarlo

- Home autenticada.
- Dashboard o pantalla principal.
- Pantallas donde el usuario necesita contexto de perfil.
- Secciones con notificaciones o recompensas disponibles.

### Cuando no usarlo

- Checkout, onboarding o flujos criticos enfocados.
- Modales o pantallas full-screen.
- Pantallas donde los accesos de navegacion distraen de la tarea principal.

### Composition Rules

- Header debe componer `Avatar` e `IconButton`.
- Notification badge es una propiedad booleana de `IconButton`.
- Rewards usa `IconButton` con icon slot reemplazable.
- Avatar de usuario siempre visible en el MVP.
- Pet avatar queda fuera del MVP del Header.
- Header usa semantic tokens y layout primitives; los tokens de hijos pertenecen a `Avatar` e `IconButton`.

## Use Cases

### Generic

| Tipo | Uso |
| --- | --- |
| App shell | Identidad y acciones persistentes |
| Greeting | Contexto personalizado |
| Notifications | Entrada a eventos pendientes |
| Rewards | Entrada a beneficios |
| Avatar | Perfil o configuracion de usuario |

### Producto Musky

| Caso | Como aplica |
| --- | --- |
| Home | Saluda al usuario y muestra acciones principales de cuenta |
| Recompensas | Permite abrir beneficios o puntos |
| Notificaciones | Comunica vacunas, citas u otras alertas |
| Perfil | Entrada rapida al perfil del usuario |

## Data Model

| Field | Type | Example | How it applies |
| --- | --- | --- | --- |
| `user_name` | string | `Eduardo` | Se muestra en el saludo; si no existe se usa fallback. |
| `user_avatar` | image_url | `https://...` | Imagen del Avatar; si falta se usan iniciales. |
| `notifications_count` | number | `2` | Activa el badge y se incluye en el label accesible. |
| `notifications_type` | array | `["vaccines", "appointments"]` | Permite categorizar futuras notificaciones. |
| `rewards_status` | enum | `active` | Controla visibilidad o enfasis de rewards. |
| `rewards_points` | number | `1200` | Dato disponible para pantallas de rewards o labels futuros. |

Source: Supabase.

Fallbacks:

- `user_name`: saludo generico.
- `user_avatar`: initials.
- `notifications_count`: `0`.
- `rewards_status`: `inactive`.

## Tokens

| Token | Uso |
| --- | --- |
| `semantic/background/app` | Fondo del Header |
| `semantic/text/primary` | Texto del saludo |
| `semantic/focus/ring` | Referencia semantica para foco de hijos |
| `typography/label/md/*` | Metricas del saludo (alineado con `Musky/Typography/Label`) |
| `typography/label/sm/*` | Iniciales avatar (`Musky/Typography/Label Small`) |
| `space-2` | Padding vertical |
| `space-3` | Gap interno |
| `space-4` | Padding horizontal |

Header no expone tokens `component/header/*`. Los detalles visuales de avatar, icon button, badge y focus pertenecen a los componentes hijos.

## Accessibility

- Role: `banner`.
- Avatar: button cuando es interactivo, con `aria-label="Abrir perfil de usuario"`.
- Rewards: icon-only button con `aria-label="Abrir recompensas"`.
- Notifications: icon-only button con `aria-label="Abrir notificaciones"` o `Abrir notificaciones, 2 pendientes`.
- Badge: decorativo, no recibe foco y no aparece como item separado en el orden de lectura.
- Focus order: Avatar/User, Rewards, Notifications.
- Keyboard: acciones hijas usan botones nativos.

### Reading Order

| Orden | Elemento | Anuncio esperado |
| --- | --- | --- |
| 1 | Avatar/User | `Abrir perfil de usuario, boton` |
| 2 | Rewards | `Abrir recompensas, boton` |
| 3 | Notifications | `Abrir notificaciones, 2 pendientes, boton` |

### QA Checklist

- El avatar de usuario esta siempre visible.
- El badge no se anuncia separado del boton.
- Los icon-only buttons tienen `aria-label`.
- El saludo mantiene `Hola` regular y nombre en bold.
- Focus visible aparece en los componentes hijos.

## Figma Contract

- File: `https://www.figma.com/design/q9gY8GgGHuGhrQ4iZ7Uo1e/Components`
- Page: `Header`
- Reference node: `99:549`
- Component set: `Header`
- Background: white/light gray through `semantic/background/app`.
- Header compone instancias de `Avatar` e `IconButton`.
- **Saludo:** en codigo, `¡Hola` va en regular y el nombre en **bold** (`musky-header__greeting-regular` / `musky-header__greeting-name`). En Figma, una capa TEXT puede usar **rangos de fuente** (Regular + Bold) sobre la misma cadena, o dos capas; variante sin nombre solo muestra `¡Hola!` en regular.
- **Tipografia:** estilos `Musky/Typography/Label` para el saludo con nombre; iniciales del avatar con `Musky/Typography/Label Small`. Detalle en `docs/foundations/figma-musky-contract.md`.
- La documentacion visual debe conservar secciones de anatomy, properties, layout and spacing, data needed, accessibility annotations y tokens.

## Code Contract

- Component: `packages/ui/src/components/Header/Header.tsx`
- Styles: `packages/ui/src/components/Header/Header.css`
- Metadata: `packages/ui/src/components/Header/Header.metadata.json`
- Props:
  - `user`
  - `notificationsCount`
  - `rewardsStatus`
  - `showNotifications`
  - `showRewards`
  - `notificationIcon`
  - `rewardsIcon`
  - `onAvatarClick`
  - `onNotificationsClick`
  - `onRewardsClick`

Header is exported from `packages/ui/src/index.ts`.

## Notes And Decisions

- Header MVP muestra solo avatar de usuario, no pet avatar.
- Notifications, rewards y avatar son componentes independientes.
- Notification badge es boolean property.
- El saludo debe mantener espacio correcto entre `Hola` y el nombre.
- Header usa tokens semanticos genericos, no tokens component-specific.
- Los iconos no aparecen como pasos independientes en el orden SR.
