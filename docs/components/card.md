# Card Component

## Objetivo

Agrupar informacion y/o acciones en una unidad visual clara.

## Rol

Card es la unidad de decision del sistema. Representa contenido, entidades o acciones de forma escaneable y puede usarse sola o dentro de `CardCarousel`.

## Cuando usarlo

- Listas de contenido.
- Acciones agrupadas.
- Representacion de entidades: producto, mascota, reward o accion.

## Cuando NO usarlo

- Accion unica: usar `Button`.
- Informacion minima: usar `ActionList` item.
- Mensajes globales: usar `Banner`.

## Estructura

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Contenedor | Layout | Si | elevated / outlined / flat | Base visual tokenizada |
| Imagen/Icono | Visual | Opcional | image / icon / none | Contexto visual |
| Chip | UI | Opcional | requerido / pendiente / proximo / info | Estado o prioridad |
| Titulo | Texto | Si | 1-2 lineas | Mensaje principal |
| Subtitulo | Texto | Opcional | 1-2 lineas | Contexto |
| Metadata | Texto | Opcional | fecha / progreso | Info secundaria |
| CTA | Accion | Opcional | link / dos botones (primario + secundario) | Dos acciones internas; una sola accion = card clicable sin botones |

## Reglas de contenido

- Titulo = accion o contexto principal.
- Subtitulo = explicacion o consecuencia.
- Metadata = fecha, estado o progreso.
- Chip = prioridad traducida a humano.
- Ocultar elementos vacios.

## Reglas de interaccion

- Navigation card: si hay una sola accion, toda la card es clicable y no lleva botones internos.
- Si hay dos acciones distintas, usar dos botones internos (primario + secundario, tamano sm); la superficie de la card no debe duplicar una tercera accion.
- Link interno opcional cuando la card no es el unico destino de navegacion.
- Cada boton interno tiene foco independiente.

## Reglas visuales

- Maximo dos niveles principales de texto.
- Evitar saturacion de chips y metadata.
- Prioridad por posicion y jerarquia, no solo por color.
- Reusar `Chip`, `Icon` y `Button`; no redibujar internamente.
- Al ser un componente generico, debe usar tokens semanticos y base (`semantic`, `space`, `radius`, `typography`), no tokens especificos `component/card/*`.
- Si usa imagen en orientacion vertical, la imagen llega a los bordes de la card sin margen interno; solo el body conserva padding.
- El chip se controla como una propiedad encendible/apagable y debe ser instancia del componente `Chip`.

## Tokens

- Superficie: `semantic/background/surface`.
- Hover y visual placeholder: `semantic/background/surfaceAlt`.
- Borde: `semantic/border/subtle` + `borderWidth/default`.
- Texto: `semantic/text/primary` y `semantic/text/secondary`.
- Link CTA: `semantic/action/linkText`.
- Tipografia: titulo `typography/body` (semibold), subtitulo `typography/bodySmall`, metadata `typography/caption`, enlace `typography/link`.
- Espaciado: `space/2` (stack interno entre título, subtítulo y bloques), `space/3`, `space/4`.
- Radio: `radius/md`.
- Elevacion y estados: `semantic/elevation/*` y `semantic/state/*`.

## Reglas de prioridad

- El chip define importancia.
- El orden visual refleja prioridad.
- Las acciones criticas deben ir a lista vertical, no a carousel.

## Fallbacks

- Sin imagen: usar icono o ocultar visual.
- Sin subtitulo: ocultar.
- Sin metadata: ocultar.
- Sin CTA: card puede ser navegable si `type=navigation`.

## Accesibilidad

- Card clicable = un solo foco.
- CTA interno = foco independiente.
- Lectura lineal: chip, titulo, subtitulo, metadata, accion.
- El bloque de Figma `Accessibility annotations — Card / Orden SR` documenta el orden: visual/chip opcional, titulo como nombre accesible, subtitulo, metadata y CTA.
- Las cards no muestran chevron; la navegacion se comunica por el foco, el rol y el contenido.
- Info card no debe recibir foco si no tiene accion.

## Focus state and reading order

- Navigation card sin CTA interno: toda la card puede ser un unico link o button.
- Action card con dos botones internos: dos focos para primario y secundario; la superficie no es interactiva por si sola salvo que se defina otro patron de producto.
- Disabled card: mantiene lectura del contenido, pero comunica estado no disponible cuando aplica.
- Loading card: debe anunciar carga solo si bloquea la interaccion.

## Data necesaria

Los campos compartidos estan en `data/ui-fields.json`:

| field_id | Rol |
| --- | --- |
| `item_id` | Identificador estable |
| `item_type` | Tipo de item |
| `title` | Titulo visible |
| `description` | Subtitulo |
| `priority` | Prioridad/chip |
| `image_url` | Imagen opcional |
| `action_type` | Tipo de accion |
| `action_target` | Destino |
| `is_clickable` | Interaccion |
| `list_order` | Orden |
| `visibility` | Mostrar/ocultar |

## Variantes

- Navigation card.
- Action card.
- Info card.
- Vertical / horizontal.
- Compact / default.
- Elevation none / low / high.

## Estados

- Default.
- Disabled.
- Loading.

## Ejemplos

- Producto.
- Mascota.
- Accion pendiente.
- Reward o promocion.

## Anti-patterns

- Boton + card clicable duplicando accion.
- Demasiado texto.
- Uso excesivo de chips.
- Usar para mensajes globales.

## Relacion

- `CardCarousel` contiene cards.
- `ActionList` cubre acciones urgentes o prioritarias.
- `Banner` cubre mensajes globales.
