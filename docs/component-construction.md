# Component Construction

## Overview

Esta guia define el proceso para construir componentes de Musky desde documentacion, referencia visual, datos y tokens. La fuente humana vive en `docs/components/*.md`; Figma, Storybook, metadata JSON y codigo deben quedar alineados con esa fuente.

El objetivo es evitar componentes aislados: cada componente debe nacer con contrato visual, contrato de datos, contrato de accesibilidad y contrato tecnico.

## Workflow

### 1. Orient

Antes de crear o modificar un componente:

- Identificar el objetivo del componente.
- Confirmar si es un componente nuevo, una variante o una composicion de componentes existentes.
- Revisar `docs/components/` para evitar duplicados.
- Revisar `packages/ui/src/components/**/*.metadata.json` para comprobar contratos existentes.
- Revisar Figma y Storybook para entender el estado visual actual.

### 2. Explore

Recopilar referencias:

- Imagen o pantalla de referencia.
- Pagina de Figma y node/component set si existe.
- Historias de Storybook.
- Metadata JSON existente.
- Campos de `data/ui-fields.json`.
- Tokens disponibles en Figma y `packages/ui/src/styles/tokens.css`.

### 3. Study

Convertir la referencia en especificacion:

- Anatomia: partes internas del componente.
- Propiedades: variantes, booleans, slots y estados.
- Layout: padding, gap, tamanos, alineacion y constraints.
- Datos: campos necesarios, source y fallbacks.
- Accesibilidad: role, nombre accesible, orden de lectura, teclado y focus.
- Tokens: semantic, typography, layout y component aliases.

### 4. Gather

Antes de implementar, hacer un token audit y un gap check.

#### Token audit

Comprobar:

- Si el token ya existe como primitive, semantic, typography, layout o component token.
- Si el componente debe consumir un semantic token generico o un component token especifico.
- Si el token de Figma tiene equivalente en CSS.
- Si el nuevo valor es realmente reusable o solo una decision local.

Regla:

- Componentes genericos o de app shell usan semantic tokens y layout primitives cuando sea suficiente.
- Componentes de accion con jerarquia visual propia pueden exponer component tokens aliasados a semantic tokens.
- No crear tokens nuevos para saltarse una decision de sistema.

#### Gap check

Comprobar:

- Si falta un field en `data/ui-fields.json`.
- Si falta una variante en metadata JSON.
- Si falta una story en Storybook.
- Si falta una propiedad o variant en Figma.
- Si focus existe como estado real del componente.
- Si el orden de lectura esta documentado.

## Component Documentation Template

Cada documento de `docs/components/*.md` debe seguir esta estructura:

1. `Overview`
2. `Visual Table`
3. `AI Spec`
4. `Use Cases`
5. `Data Model`
6. `Tokens`
7. `Accessibility`
8. `Figma Contract`
9. `Code Contract`
10. `Notes And Decisions`

## Figma Rules

Cada componente debe tener:

- Pagina o seccion identificable.
- Component o Component Set cuando tenga variantes.
- Variants/properties/booleans en lugar de duplicados sueltos.
- Instancias de componentes hijos cuando componga piezas independientes.
- Variables aplicadas desde `Musky - UI Tokens` cuando existan.
- Focus como estado real o variant del componente.

El focus debe verse como un ring externo con offset de `2px`. En Figma, si la API no permite stroke outside de forma fiable, usar un wrapper interno que represente visualmente el offset sin superponer un overlay ajeno al componente.

## Code Rules

Cada componente implementado en `packages/ui/src/components/` debe incluir:

- `Component.tsx` con props tipadas.
- `Component.css` consumiendo tokens CSS.
- `Component.metadata.json` como contrato machine-readable.
- `Component.stories.tsx` para Storybook.
- `index.ts` para export local.
- Export desde `packages/ui/src/index.ts` si forma parte del paquete publico.

Los estilos deben consumir tokens desde `packages/ui/src/styles/tokens.css`. Evitar hardcodear colores, tipografia, radii o focus cuando exista token.

## Data Rules

Los campos compartidos viven en `data/ui-fields.json`.

Cada componente debe documentar:

- `field_id`
- `type`
- `example`
- `how it applies`
- source si aplica
- fallback si aplica

No crear nombres locales si el field puede ser compartido por varios componentes. Para datos reales, Supabase es la fuente directa de componentes.

## Accessibility Rules

Cada componente debe documentar:

- Role o semantica nativa.
- Nombre accesible.
- Orden de lectura para screen reader.
- Soporte de teclado.
- Estado focus visible.
- Reglas de disabled, loading, selected o badge si aplica.
- Checklist QA.

Icon-only controls requieren `aria-label`. Badges decorativos no reciben foco; si comunican cantidad o estado, esa informacion debe estar en el label accesible del control.

## Verification

Antes de cerrar un componente:

- El Markdown no contradice metadata JSON.
- Figma usa component sets/properties cuando corresponde.
- Storybook muestra variantes principales y estados relevantes.
- `data/ui-fields.json` contiene los fields compartidos usados por el doc.
- Focus se documenta y se implementa como ring externo con `2px` de offset.
- No aparece una variante activa que haya sido descartada por decision de sistema.
