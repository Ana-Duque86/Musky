# Action List

## Overview

Action List muestra un conjunto de acciones que el usuario debe realizar, ordenadas por prioridad y contexto. El componente principal es una **card contenedora** con borde y radio; dentro se componen filas reutilizables (`Action List Item`), chips independientes (`Chip / Priority`) y, para reembolsos, barras de progreso segmentadas.

En codigo, la card contenedora usa tokens genericos (`semantic/background/surface`, `semantic/border/subtle`, `radius/md`); las filas reutilizan **tokens de layout compartidos** (`layout/icon/size/*`, `layout/container/insetDense`, `spacing/*`) junto a semanticos de superficie, texto e iconos; el chip usa `component/chip/*`.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Contenedor | Card | Si | grouped / flat | Card con borde y radio tokenizados; sin padding interno en Action List |
| Item (fila) | Componente | Si | actionable / informational | Unidad basica |
| Icono / avatar | `Icon / Action` | Opcional | microchip / medicalDocument / injection / care / notifications / notificationsBadge / present | Leading **sm** (24px), tono **secondary** por defecto; override con `iconSize` / `iconTone` |
| Chip prioridad | `Chip / Priority` | Opcional | urgent / high / normal / low | Misma fila horizontal que el titulo, gap 8px, alineacion vertical centrada entre titulo y chip |
| Progreso reembolso | Indicador | Opcional | none / blocked / reviewing / processingPayment / paid | Sustituye el chip cuando la fila representa un reembolso |
| Titulo | Texto | Si | corto / multilinea | Accion principal; puede envolver a segunda linea (sin ellipsis) |
| Subtitulo | Texto | Opcional | 1–2 lineas | Contexto o consecuencia |
| Metadata | Texto | Opcional | fecha / detalle | Informacion secundaria |
| Chevron | Icono | Condicional | visible / oculto | Visible solo si la fila es navegable/actionable |
| Divider | Layout | Opcional | visible / oculto | Separacion entre items; oculto en el ultimo item |

### Layout

| Zona | Elementos | Comportamiento |
| --- | --- | --- |
| Izquierda | Leading | Slot icono **sm** 24×24 (`layout/icon/size/sm`), tono duotono secondary, fondo `semantic/background/surfaceAlt` |
| Centro | Fila titulo + chip (si aplica); subtitulo; metadata; barras de progreso (reembolso) | Titulo puede ocupar varias lineas; chip en la misma fila flex que el bloque de titulo, gap `spacing/2`, centrado en vertical respecto al bloque de titulo |
| Derecha | Slot chevron **38×38** (`layout/icon/size/md`) + glifo **24×24** (`layout/icon/size/sm`); solo `type=actionable`; gap `spacing/2` respecto al bloque central |
| Contenedor | Card + lista vertical | Borde y radio desde tokens; scroll si hace falta |

### Properties (Figma)

| Property | Valores |
| --- | --- |
| `type` | actionable / informational |
| `priority` | urgent / high / normal / low |
| `hasChip` | true / false |
| `hasMetadata` | true / false |
| `hasIcon` | true / false |
| `leadingIcon` | `Icon / Action` variant |
| `hasDivider` | true / false |
| `hasChevron` | true / false (`actionable` only) |
| `progressStatus` | none / blocked / reviewing / processingPayment / paid |
| `isClickable` | true / false |
| `grouping` | grouped / flat |
| `density` | compact / default |
| `state` | default / pressed / disabled |

### States

| Estado | Uso | Ejemplo |
| --- | --- | --- |
| Default | Lista normal con acciones navegables | Pendientes de perfil |
| Con urgentes | Uno o mas items bloqueantes | Microchip obligatorio |
| Mixto | Distintas prioridades en la misma card | Urgente + informativo |
| Empty | Sin acciones pendientes | «Todo esta al dia» fuera de la lista |
| Disabled | Acciones no disponibles temporalmente | Fila con texto/icono secundario |
| Reembolso bloqueado | No se puede solicitar o avanzar | Progress segment 1 activo |
| Reembolso en revisión | Documentacion o caso en revision | Progress segments 1–2 activos |
| Reembolso procesando pago | Reembolso aprobado, pago en curso | Progress segments 1–3 activos |
| Reembolso pagado | Pago completado | Progress segments 1–4 activos |

## AI Spec

### Objetivo

Priorizar tareas, guiar decisiones y reflejar estado del sistema a nivel de accion individual y de lista.

### Cuando usarlo

- Multiples acciones pendientes.
- Necesidad de priorizar.
- Decisiones distribuidas en varios pasos.
- Agrupacion logica de acciones relacionadas.

### Cuando no usarlo

- Una sola accion: boton o card.
- Solo informacion estatica: Banner o Card.
- Ejecucion directa en sitio: Button.
- Navegacion exploratoria: lista simple de menu.

### Estructura logica

Card contenedora, lista vertical, items internos, icono leading como instancia de `Icon / Action`, chip de prioridad opcional, titulo, subtitulo opcional, metadata opcional, chevron solo si navega y divider entre items.

### Reglas de contenido

**Titulo:** verbo + objeto; preferir una linea, permitir salto a segunda linea cuando el ancho sea estrecho (sin puntos suspensivos).

**Subtitulo:** consecuencia o contexto, maximo dos lineas.

**Chip:** urgent (bloqueante), high (importante), normal / info (no urgente).

**Progreso de reembolso:** usar `progressStatus` en lugar de chip. El titulo resume el estado (ej. «Reembolso bloqueado»), el subtitulo el motivo o siguiente paso (ej. «Falta añadir microchip») y la metadata muestra solo la fecha de creacion de la solicitud. Las barras usan tokens de estado: `blocked` usa `semantic/status/danger/progress`, `reviewing` info onSurface, `processingPayment` info onSurface y `paid` success onSurface.

**Espaciado de reembolso:** el stack de contenido usa `spacing/2` (`8px`) entre fila titulo+chip, subtitulo, metadata y segmentos; el padding de la fila usa `layout/container/insetDense` (`10px` en todos los lados); las barras mantienen `2px` de margen inferior respecto al borde del item.

**Leading icon:** siempre como componente `Icon / Action` (no texto suelto). Debe reforzar el tipo de accion, no reemplazar el titulo accesible.

**Lista:** agrupar acciones relacionadas dentro de una sola card; no renderizar items flotando como componentes sueltos en producto.

### Copy dinamico (banner sobre la lista)

Si hay mezcla de prioridades, el mensaje superior debe reflejar la prioridad mas alta:

| Situacion | Copy orientativo |
| --- | --- |
| 1 urgente + otros | «Tienes 1 accion urgente» |
| Solo pendientes altas | «Tienes N tareas pendientes» |
| Solo informativas | «Tienes proximas acciones» |
| Ninguna | «Todo esta al dia» |

### Reglas de interaccion

- Toda la fila clicable cuando `isClickable`.
- `type=informational` no muestra chevron por defecto porque no es accionable.
- Sin boton dentro del item: la fila es el affordance.
- Un destino por item.

### Reglas visuales

- Prioridad mediante chip, no fondo de fila completo.
- En reembolsos, estado mediante barras segmentadas; no mostrar chip a la vez.
- Orden: urgentes arriba.
- Maximo 5–7 items visibles sin scroll si es posible.
- La lista se presenta como card (borde + radio tokenizados), no como filas flotantes sueltas.
- Dividers solo entre items y alineados a los margenes internos de la card.

## Use Cases

### Genericos

| Tipo | Ejemplo |
| --- | --- |
| Urgente | «Verifica tu identidad» |
| Pendiente | «Completa tu perfil» |
| Informativo | «Evento proximo» |
| Mixto | Urgente + tareas |

### Producto Musky

| Item | Chip | Titulo | Subtitulo |
| --- | --- | --- | --- |
| 1 | Requerido | Añade el microchip | Necesario para activar reembolsos |
| 2 | Pendiente | Termina la contratación del seguro | Caduca el 9 de febrero |
| 3 | Próximo | Vacuna de los 6 meses de Perrín | Programa la cita con antelación |

### Diferencias generico vs producto

| Generico | Musky |
| --- | --- |
| Acciones pendientes neutras | Tareas de mascota, contratacion, documentacion |
| Prioridad de negocio | Urgente por bloqueo de reembolso o cobertura |
| Metadata generica | Mascota, paso, fecha o recordatorio |

## Data Model

Los campos compartidos estan en `data/ui-fields.json`. Resumen:

| field_id | Rol |
| --- | --- |
| `action_id` | Identificador estable |
| `action_icon` | Icono leading configurable |
| `action_title` | Titulo de la fila |
| `action_description` | Subtitulo |
| `task_priority` | urgent / high / normal / low (prioridad de negocio; distinto de `action_priority` del Button System) |
| `action_status` | pending / completed / blocked |
| `action_type` | Incluye navigation, task, info para items de lista |
| `action_target` | Destino |
| `related_entity_type` / `related_entity_id` | Contexto |
| `due_date` | Fecha relevante |
| `is_blocking` / `is_completed` | Logica |
| `action_group` | Agrupacion |
| `display_order` | Orden visual |
| `list_grouping` | grouped / flat |
| `count_actions` / `highest_priority` | Banner resumen |

## Tokens

### Codigo (CSS)

| Uso | Tokens principales |
| --- | --- |
| Card | `--semantic-background-surface`, `--semantic-border-subtle`, `--radius-md` |
| Fila | `--semantic-background-surface`, gap columnas `--space-2` (8px), padding `--layout-container-inset-dense` (10px), slots leading/chevron `--layout-icon-size-md` (38px), glifo chevron `--layout-icon-size-sm` (24px), leading con `semantic/background/surfaceAlt` |
| Texto | `--semantic-text-primary`, `--semantic-text-secondary`, tipografia `body`, `bodySmall`, `caption` |
| Iconos / chevron | `--semantic-icon-primary`, `--semantic-icon-secondary` |
| Chip | `--component-chip-status-*`, `--component-chip-base-*` |
| Progreso reembolso | `spacing/2` entre segmentos; colores `semantic/status/danger/progress`, `color/info-on-surface`, `color/success-on-surface`; pista `semantic/border/subtle` |

### Figma (coleccion Musky — UI Tokens)

| Uso en el componente | Path de variable (enlazar en el archivo) |
| --- | --- |
| Fondo card | `semantic/background/surface` |
| Borde card | `semantic/border/subtle` |
| Padding card | `0` en Action List; el margen exterior lo define la pantalla |
| Radio card | `radius/md` |
| Borde divider | `semantic/border/subtle`, `borderWidth/default` |
| Padding fila | `layout/container/insetDense` (10px) en todos los lados; compartido con cards y superficies compactas similares |
| Gap entre columnas | `spacing/2` (8px) entre leading, contenido y slot chevron |
| Slots 38 / glifo 24 | `layout/icon/size/md` (38×38) para leading y area de chevron; `layout/icon/size/sm` (24×24) para el glifo del chevron; `layout/icon/size/lg` (48×48) disponible para otros patrones |
| Gap contenido interno | `spacing/2` entre fila titulo+chip, subtitulo, metadata y progreso |
| Texto titulo | `semantic/text/primary` + `typography/body/md/fontSize` |
| Texto secundario | `semantic/text/secondary` |
| Iconos / chevron | `semantic/icon/primary`, `semantic/icon/secondary`; medidas desde `layout/icon/size/*`; slot de chevron centrado en altura de fila |
| Leading slot | `layout/icon/size/md` + `semantic/background/surfaceAlt` + `radius/md` |
| Chip base | `component/chip/base/paddingX`, `component/chip/base/paddingY`, `component/chip/base/radius` |
| Chip prioridad | `component/chip/status/danger|warning|info|success/*` |
| Progreso reembolso | `spacing/2`, `semantic/status/danger/progress`, `semantic/border/subtle`, `radius/full` |
| Foco | `semantic/focus/ring`, `semantic/focus/ringWidth` |

## Accessibility

- Item navegable: rol `button` o fila dentro de `list` con nombre accesible = titulo + chip (si esta en la fila del titulo) o progreso si existe.
- Chevron decorativo si el nombre ya comunica la accion.
- Leading icon decorativo salvo que aporte informacion no repetida en el texto.
- Prioridad no solo por color: chip incluye texto.
- Progreso de reembolso no solo por color: el indicador incluye `aria-label` con el estado.

### QA Checklist

- La lista renderiza como una card con borde y radio, no como items sueltos.
- Card, filas, dividers, chips y texto tienen variables Figma enlazadas.
- Leading icon es una instancia de `Icon / Action`, no un glifo de texto ni geometria local.
- Divider se muestra entre items y respeta los margenes de la card.
- El chip queda en la **misma fila flex** que el bloque de titulo (gap 8px); el titulo puede **envolver** a varias lineas (sin ellipsis).
- En filas de reembolso, el chip se oculta y las barras anuncian estado accesible.
- El orden visual coincide con el orden de lectura.
- La prioridad se comunica con texto visible ademas de color.

## Figma Contract

- File: `https://www.figma.com/design/q9gY8GgGHuGhrQ4iZ7Uo1e/Components`
- Pagina: `Action List`
- Componente principal **Action List Card** (`119:839`): card contenedora con fondo `semantic/background/surface`, borde `semantic/border/subtle`, radio `radius/md` y padding interno `0`.
- Component set **Action List Item** (`117:721`): variantes `type` × `priority`; props **Show icon**, **Show chip**, **Show metadata**, **Show divider**, **Show chevron** (`actionable` only).
- Icon: componente independiente **Icon / Action** (`121:945`); la fila usa instancias en el leading.
- Chip: componente independiente **Chip / Priority** (misma pagina); la fila usa **instancias**, no capsulas dibujadas en la fila.
- Filas, dividers, textos, iconos y chips enlazados a variables Figma (`semantic/*`, `spacing/*`, `layout/icon/size/*`, `layout/container/insetDense`, `component/chip/*`, `typography/*`).
- Las barras de reembolso usan colores semanticos (`semantic/status/danger/progress`, info on-surface, success on-surface) y `semantic/border/subtle` para la pista; no sustituyen el texto de titulo/subtitulo.

## Code Contract

- Tokens: `packages/ui/src/styles/tokens.css`
- Metadata: `packages/ui/src/components/ActionList/ActionList.metadata.json`
- Implementacion React: pendiente segun producto.

## Notes And Decisions

- El patron documentado se centra en la composicion completa (**card + lista**), no solo en la fila aislada.
- `Action List Item` se mantiene como building block interno para variantes de prioridad/tipo.
- El chip se mantiene como componente independiente (`Chip / Priority`) instanciado dentro de cada fila.
- Las barras de reembolso son una variante de fila, no un componente de chip.
- No se crean tokens de color nuevos; el patron reutiliza semanticos y chip. Tamaños de icono y areas cuadradas compartidos: **Musky — UI Tokens** `layout/icon/size/{sm,md,lg}` (24 / 38 / 48); inset compacto compartido `layout/container/insetDense` (10px). En codigo: `--layout-icon-size-*` y `--layout-container-inset-dense` en `tokens.css`.
