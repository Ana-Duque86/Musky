# Card Carousel

## Objetivo

Permitir exploracion horizontal de multiples cards.

En carruseles de promos, el objetivo principal es upsell / cross-sell.

## Rol

Card Carousel es la unidad de exploracion del sistema. Muestra recomendaciones, promociones, rewards o features sin ocupar demasiado espacio vertical.

## Cuando usarlo

- Recomendaciones.
- Promociones.
- Rewards.
- Contenido secundario.
- Agrupaciones horizontales homogeneas.

## Cuando NO usarlo

- Acciones criticas.
- Flujos obligatorios.
- Listas prioritarias: usar `ActionList`.

## Estructura

| Elemento | Tipo | Obligatorio | Descripcion |
| --- | --- | --- | --- |
| Contenedor | Layout | Si | Scroll horizontal |
| Card item | Componente | Si | Instancia de `Card` |
| Indicador scroll | UI | Opcional | Dots o hint |
| Header | Texto | Opcional | Titulo de seccion |
| Boton header | Accion | Condicional | Aparece si hay mas de dos items y destino amplio |

## Reglas de contenido

- Cards homogeneas.
- Maximo 5-10 items.
- No mezclar prioridades.
- El boton de cabecera se muestra cuando hay mas de dos cards y existe una vista completa.
- Si el filtro seleccionado es `Todos`, mostrar la etiqueta de tipo (ej. `Promo`) dentro de cada card.
- Si el usuario selecciono un chip/filtro de tipo de contenido, ocultar esa etiqueta dentro de las cards para no repetir contexto.
- El contenido debe estar personalizado por elegibilidad, estado del usuario, mascota activa y beneficio disponible.

## Promo Tractive

| Condicion | Resultado |
| --- | --- |
| No tiene Tractive | Mostrar venta / upsell |
| Tiene Tractive | Mostrar insights o uso del dispositivo |

| Tipo | Copy | Por que |
| --- | --- | --- |
| Promo | Dispositivo Tractive gratis | Beneficio / hook |
| Sub | Localiza y cuida a Perrin | Valor personalizado |

### Personalizacion minima

- `has_tractive`: evita vender un beneficio ya activo.
- `pet_name`: personaliza el subtitulo.
- `benefit_eligibility`: confirma que el usuario puede ver la promo.
- `selected_content_type`: decide si se muestra u oculta la etiqueta de tipo.
- `campaign_id`: conecta la promo con medicion y reglas de marketing.
- `visibility`: oculta el item si no aplica.

## Reglas de interaccion

- Scroll horizontal.
- Snap opcional.
- Cada card mantiene su foco.
- No usar para acciones urgentes.

## Reglas visuales

- Todas las cards de la misma fila comparten la misma altura: se alinea al contenido de la card mas alta; el cuerpo de la card rellana el espacio y el pie (metadata o acciones) queda alineado al borde inferior.
- Espaciado consistente entre cards.
- No recrear internals de card dentro del carousel.
- Usar tokens base para espaciado y tipografia; no crear tokens `component/cardCarousel/*` salvo que una necesidad nueva no pueda resolverse con tokens genericos.
- Cuando hay mas de dos cards accionables/items, mostrar un `Button` secundario pequeno en el header para ir a la vista completa.

## Tokens

- Espaciado: `space/2` (cabecera del carrusel), `space/3` y `layout/screen/paddingX`.
- Texto: `semantic/text/primary`, `semantic/text/secondary`, `typography/h3`, `typography/bodySmall`.
- Los anchos de item (`sm`, `md`, `lg`) son decisiones de layout del componente, no tokens exportados del sistema.

## Reglas de prioridad

- Nunca para urgentes.
- Si prioridad alta: `ActionList`.
- Si accion unica: `Card` standalone.
- Si exploracion: `CardCarousel`.

## Fallbacks

- 0 items: ocultar componente.
- 1 item: renderizar `Card` standalone.

## Accesibilidad

- Region nombrada por el header cuando exista.
- Scroll usable por touch/trackpad/teclado del navegador.
- Cards tabulables de forma independiente.
- El bloque de Figma `Accessibility annotations — Card Carousel / Orden SR` documenta el orden: header, boton opcional de cabecera, track horizontal, cards y etiqueta de tipo.
- El carousel no debe ocultar tareas urgentes o acciones obligatorias dentro del scroll.

## Focus state and reading order

- El header nombra la region cuando existe.
- El boton de cabecera es foco independiente y aparece solo si hay mas de dos items y una vista completa.
- Cada `Card` conserva su propio foco y nombre accesible.
- El track usa scroll nativo; no debe atrapar foco.

## Data necesaria

| field_id | Rol |
| --- | --- |
| `items` | Coleccion de cards |
| `item_type` | Tipo de item |
| `collection_id` | Grupo |
| `list_order` | Orden |
| `visibility` | Mostrar/ocultar |
| `selected_content_type` | Filtro activo |
| `has_tractive` | Estado del beneficio Tractive |
| `benefit_eligibility` | Elegibilidad |
| `pet_name` | Personalizacion |

## Variantes

- Promo carousel.
- Content carousel.
- `scrollType`: snap / free.
- `cardSize`: sm / md / lg.
- `peek`: true / false.

## Estados

- Default.
- Scroll.
- Empty.

## Ejemplos

- Recomendaciones.
- Ofertas.
- Rewards.
- Features secundarias.

## Anti-patterns

- Mezclar prioridades.
- Usar para acciones criticas.
- Ocultar tareas obligatorias en scroll horizontal.

## Relacion

- Contiene `Card`.
- Complementa secciones de discovery.
- No sustituye `ActionList`.
