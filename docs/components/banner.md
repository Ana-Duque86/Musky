# Banner

## Overview

Banner muestra informacion contextual, estados globales, avisos o recomendaciones sin interrumpir el flujo principal. Ayuda a dar contexto, comunicar prioridad, reforzar estados del sistema y guiar sin modales innecesarios.

El sistema de tokens de color para Banner esta definido en `packages/ui/src/styles/tokens.css` (`--component-banner-*`) y documentado en Storybook bajo **Foundations / Colors / Component / Banner**.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Contenedor | Layout | Si | info / warning / promo / danger / success | Area que agrupa el mensaje contextual |
| Icono | Emoji configurable | Opcional | por variante / none | Refuerza el tipo de mensaje y puede cambiarse por instancia |
| Titulo | Texto | Opcional | visible / oculto | Mensaje principal cuando hace falta jerarquia |
| Descripcion | Texto | Si | una linea / multilinea | Contexto, estado o recomendacion |
| Link inline | Texto interactivo | Opcional | visible / oculto | Accion secundaria de bajo peso, p. ej. «Ver bases» |
| CTA | Boton | Opcional | none / link / button | Solo si el banner requiere accion clara |
| Dismiss | Icono accion | Opcional | visible / oculto | Cierra banners no criticos |

### Layout

| Zona | Elementos | Comportamiento |
| --- | --- | --- |
| Izquierda | Emoji icon | Puede ocultarse o cambiarse si el mensaje es simple |
| Centro | Titulo + descripcion + link | Contenido principal |
| Derecha | Dismiss o CTA | Solo si aplica |
| Contenedor | Fondo semantico | Segun variante de estado |

### Properties (Figma)

| Property | Valores |
| --- | --- |
| `variant` | info / warning / promo / danger / success |
| `hasIcon` | true / false |
| `hasTitle` | true / false |
| `hasInlineLink` | true / false |
| `hasCTA` | true / false |
| `ctaType` | none / link / button |
| `dismissible` | true / false |
| `density` | compact / default |
| `textAlign` | left / center |
| `tone` | soft / strong |
| `emojiInfo` / `emojiWarning` / `emojiPromo` / `emojiDanger` / `emojiSuccess` | texto emoji configurable por variante |

### Estados del componente

| Estado | Uso | Ejemplo |
| --- | --- | --- |
| Info | Contexto no urgente | «Si tienes mas de una mascota podras agregarla luego.» |
| Warning | Atencion, no bloqueante | «Es importante que la informacion coincida con la documentacion.» |
| Promo | Beneficio o incentivo | «Oferta Familia Numerosa: …» |
| Danger | Error, bloqueo o riesgo | «El codigo de descuento no es valido.» |
| Success | Confirmacion positiva | «Todo esta al dia.» |

## AI Spec

### Objetivo

Mostrar informacion contextual y estados globales visibles antes del contenido principal cuando el mensaje afecta al contexto de pantalla o seccion.

### Cuando usarlo

- El mensaje afecta al contexto de la pantalla o seccion.
- Es importante pero no siempre exige accion inmediata.
- Resume un estado global.
- Comunica advertencia, promocion, error o confirmacion.

### Cuando no usarlo

- El mensaje pertenece a un campo concreto: usar helper o error de campo.
- La informacion cabe en una card como secundaria.
- La decision es critica e inmediata: modal o pantalla dedicada.
- El mensaje es permanente y estructural: integrarlo en el layout.
- Se necesitan muchas acciones: usar lista de acciones u otro patron.

### Estructura logica

Contenedor semantico, icono opcional, titulo opcional, descripcion obligatoria, link inline opcional, CTA opcional, dismiss opcional.

### Reglas de contenido

**Tono:** claro, directo, contextual.

**Longitud:**

- Descripcion: idealmente 1–2 lineas.
- Titulo: 4–6 palabras como maximo orientativo.
- Link: 2–3 palabras.

**Jerarquia:**

- Con titulo: titulo en **bold**; descripcion mismo tono semantico sin competir.
- Promo con beneficio: el titulo o lead puede ir en bold segun diseno.
- **Danger:** el texto principal del mensaje debe ir en **bold** y usar el token de texto del banner (tono alineado con `semantic/status/danger`, contraste AA); no usar peso regular para el unico bloque de mensaje en variantes criticas.

### Reglas de interaccion

- Por defecto el Banner es informativo.
- Link inline navega a informacion complementaria.
- CTA ejecuta una accion ligada al mensaje.
- Dismiss no debe ocultar informacion critica obligatoria.
- Como maximo una accion principal clara en el banner.

### Reglas visuales

- Fondo y texto desde tokens semanticos de estado (`component/banner/{variant}/*`).
- Contraste suficiente (AA).
- Bold solo donde aporte jerarquia (titulo, beneficio, o cuerpo unico en danger segun reglas arriba).
- Un solo estado por banner.
- Evitar banners consecutivos salvo casos excepcionales.

## Use Cases

### Genericos

| Caso | Variante | Copy orientativo | Interaccion |
| --- | --- | --- | --- |
| Informacion contextual | info | «Podras modificar esta informacion mas adelante.» | Ninguna |
| Advertencia preventiva | warning | «Revisa que los datos coincidan con tu documentacion.» | Ninguna |
| Promocion | promo | «Tienes un beneficio disponible por tiempo limitado.» | Link opcional |
| Error | danger | «No pudimos validar esta informacion.» | CTA opcional |
| Confirmacion | success | «Todo esta actualizado.» | Ninguna |

### Producto Musky

| Caso | Variante | Copy | Motivo |
| --- | --- | --- | --- |
| Varias mascotas | info | «Si tienes mas de una mascota podras agregarla luego.» | Reduce ansiedad en onboarding |
| Validar documentacion | warning | «Es importante que la informacion coincida con la documentacion de tu mascota.» | Previene errores |
| Oferta familiar | promo | Titulo + descripcion + «Ver bases» | Incentiva segunda mascota |
| Codigo descuento | danger | «El codigo de descuento no es valido.» | Error accionable |
| Estado OK | success | «Todo esta al dia.» | Refuerzo positivo |

### Diferencias generico vs producto

| Generico | Musky |
| --- | --- |
| Mensajes neutros | Mascota, documentacion, contratacion |
| Promo generica | Beneficio familia / multi-mascota |
| Warning generico | Warning sobre docs de mascota |

## Data Model

Los campos compartidos viven en `data/ui-fields.json` (prefijo `message_*` y acciones relacionadas). Resumen:

| field_id | Rol |
| --- | --- |
| `message_id` | Identificador estable del mensaje |
| `message_type` | info / warning / promo / danger / success |
| `message_priority` | low / medium / high / critical |
| `message_title` | Titulo opcional |
| `message_body` | Descripcion obligatoria en UI |
| `message_icon` | Emoji o texto corto del leading (p. ej. `⚠️`), o clave de icono segun producto |
| `message_has_action` | Si incluye CTA o link de accion |
| `message_dismissible` | Si se puede cerrar |
| `visibility_condition` | Regla de negocio para mostrar |
| `campaign_start_date` / `campaign_end_date` | Ventana temporal opcional |
| `audience_segment` | Segmentacion |
| `related_entity_type` / `related_entity_id` | Entidad relacionada |
| `message_is_blocking` | Si bloquea continuar |
| `message_read_status` | unread / read / dismissed |

Acciones opcionales reutilizan `action_id`, `action_label`, `action_target`, `action_type` cuando el banner lleva CTA o link (ver valores permitidos en el catalogo).

## Tokens

### CSS (`tokens.css`)

| Variante | Tokens principales |
| --- | --- |
| Info | `--component-banner-info-bg`, `-text`, `-icon` |
| Warning | `--component-banner-warning-bg`, `-text`, `-icon` |
| Promo | `--component-banner-promo-bg`, `-text`, `-title`, `-icon`, `-link` |
| Danger | `--component-banner-danger-bg`, `-text`, `-icon` |
| Success | Reutiliza superficies de estado exito globales (`semantic/status/success/*`) cuando se implemente la variante success en componente |

Todos alias a `semantic/status/*` salvo evoluciones futuras documentadas en Storybook.

### Figma

- Coleccion **Musky — UI Tokens**: paths `component/banner/{variant}/*` alineados con el archivo de color (`color-tokens-data.ts`).
- Icono: capa de texto emoji expuesta como propiedad de componente (`emojiInfo`, `emojiWarning`, `emojiPromo`, `emojiDanger`, `emojiSuccess`) para permitir reemplazo por instancia.
- Text styles: copy del Banner con estilo completo **Musky/Typography/Body Small 600** + binding `fontWeight/semibold`; emoji con **Musky/Typography/Emoji Small**; link inline mantiene subrayado + token de link del tema promo o accion.

## Accessibility

- Rol recomendado: region con `aria-label` derivado del tipo de mensaje o titulo.
- Si hay dismiss: boton con nombre accesible «Cerrar» o equivalente.
- CTA y links deben tener nombre visible o `aria-label` completo.
- No usar solo color para estado; icono o texto refuerzan la variante.
- Contraste AA sobre fondos de estado.

### QA Checklist

- Una variante semantica por banner.
- Danger: texto principal en bold y color de token danger (no gris/rosa bajo contraste).
- Promo: jerarquia titulo / cuerpo / link clara.
- Dismiss no elimina requisitos legales u obligatorios.

## Figma Contract

- File: `https://www.figma.com/design/q9gY8GgGHuGhrQ4iZ7Uo1e/Components` (cuando exista pagina o frame Banner documentado).
- Variantes visuales alineadas con la tabla **Estados del componente**.
- Variables de color enlazadas a `component/banner/*` y semantic status.

## Code Contract

- Tokens: `packages/ui/src/styles/tokens.css`
- Referencia de color en Storybook: `packages/ui/src/foundations/colors/component-banner.stories.tsx`, `color-tokens-data.ts`
- Metadata: `packages/ui/src/components/Banner/Banner.metadata.json`
- Implementacion React del componente Banner: pendiente de producto; hasta entonces usar tokens y patrones de este documento.

## Notes And Decisions

- Link inline tipo «Ver bases» sigue el patron Body + subrayado + token `component/banner/promo/link` en promo.
- No mezclar estados en un solo Banner.
- Los campos de campana y audiencia permiten personalizacion sin acoplar copy al codigo.
