# Avatar

## Overview

Avatar representa la identidad del usuario con imagen circular o iniciales. En el Header MVP solo se usa para usuario, no para mascota.

Puede ser interactivo cuando abre perfil o no interactivo cuando solo identifica una entidad.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Container | Shape | Si | circle | Area circular del avatar |
| Image | Media | Opcional | src / none | Foto del usuario |
| Initials | Text | Fallback | generated | Iniciales cuando no hay imagen |
| Border | Stroke | Si | user | Separacion visual |
| Focus ring | State | Cuando interactivo | focus | Ring visible al navegar con teclado |

### Properties

| Property | Valores |
| --- | --- |
| `name` | string / null |
| `src` | image url / null |
| `label` | string |
| `interactive` | true / false |

### States

| Estado | Descripcion |
| --- | --- |
| Default | Imagen o iniciales visibles |
| Focus | Ring de foco cuando el avatar es button |

## AI Spec

### Objetivo

Mostrar identidad de usuario de forma compacta y permitir abrir perfil cuando el contexto lo requiera.

### Cuando usarlo

- Header autenticado.
- Perfil de usuario.
- Listas o cards donde se necesita identificar una persona.

### Cuando no usarlo

- Para representar mascota dentro del Header MVP.
- Como boton generico sin relacion con identidad.
- Como imagen decorativa sin label cuando comunica identidad.

### Content Rules

- Usar imagen si `src` esta disponible.
- Usar iniciales generadas desde `name` si no hay imagen.
- Fallback de inicial: `U`.
- Si es interactivo, debe tener label accesible.

## Use Cases

### Generic

| Tipo | Uso |
| --- | --- |
| User avatar | Identidad de cuenta |
| Interactive avatar | Entrada a perfil |
| Fallback avatar | Iniciales sin imagen |

### Producto Musky

| Caso | Como aplica |
| --- | --- |
| Header | Avatar de usuario siempre visible |
| Profile | Entrada o resumen del usuario |
| Pet scope futuro | Requiere componente dedicado `PetAvatar` |

## Data Model

| Field | Type | Example | How it applies |
| --- | --- | --- | --- |
| `user_name` | string | `Eduardo` | Genera iniciales si no hay imagen. |
| `user_avatar` | image_url | `https://...` | Imagen del avatar de usuario. |

## Tokens

| Token | Uso |
| --- | --- |
| `component/avatar/size/md` | Diametro del avatar |
| `component/avatar/user/bg` | Fondo fallback |
| `component/avatar/user/text` | Texto de iniciales |
| `component/avatar/user/border` | Borde del avatar |
| `component/avatar/focus/ring` | Focus ring |

## Accessibility

- Si tiene `onClick`, renderiza native `button`.
- Si no tiene `onClick`, renderiza elemento no interactivo con `aria-label`.
- La imagen interna usa `alt=""` porque el nombre accesible vive en el contenedor.
- Keyboard: Enter y Space cuando es button.
- Focus: visible mediante `component/avatar/focus/ring`.

### Reading Order

| Orden | Elemento | Anuncio esperado |
| --- | --- | --- |
| 1 | Avatar interactivo | `Abrir perfil de usuario, boton` |

### QA Checklist

- El avatar no usa imagen de mascota en Header MVP.
- El button tiene `aria-label`.
- Las iniciales se muestran cuando falta imagen.
- El focus ring es visible si es interactivo.

## Figma Contract

- Avatar es componente independiente.
- Header debe usar una instancia de Avatar, no recrear su estructura.
- Variantes esperadas: image / initials y focus cuando aplique.
- Debe consumir tokens `component/avatar/*`.

## Code Contract

- Component: `packages/ui/src/components/Avatar/Avatar.tsx`
- Styles: `packages/ui/src/components/Avatar/Avatar.css`
- Metadata: `packages/ui/src/components/Avatar/Avatar.metadata.json`
- Props:
  - `name`
  - `src`
  - `label`
  - `onClick`

Avatar is exported from `packages/ui/src/index.ts`.

## Notes And Decisions

- Avatar del Header siempre es de usuario.
- Pet avatar queda fuera del MVP y debe ser otro componente si se necesita.
- El fallback se basa en iniciales para mantener identidad sin depender de imagen externa.
