# Double Reward Card

## Overview

Double Reward Card muestra el estado de recompensas del usuario y activa la generacion de nuevas recompensas mediante invitacion. No es una card simple: combina feedback de valor acumulado con activacion a traves de codigo compartible.

En producto se presenta como una card compuesta y promocional: zona superior blanca de balance y zona inferior verde de marca con icono de regalo, mensaje de invitacion y codigo destacado. No usa CTA textual en el diseno actual.

## Visual Table

### Structure

| Elemento | Tipo | Obligatorio | Variantes | Descripcion |
| --- | --- | --- | --- | --- |
| Contenedor | Layout | Si | stacked / inline | Agrupa subcards |
| Subcard 1 (Balance) | Card | Si | single / multiple rewards | Muestra acumulado |
| Titulo balance | Texto | Si | dinamico | Total acumulado |
| Lista rewards | Lista | Opcional | 1 / multiples | Desglose por recompensa |
| Subcard 2 (Codigo) | Card | Si | visible / hidden | Activacion del sistema |
| Codigo | Texto | Si | masked / visible | Codigo de invitacion |
| Share icon | Icono accion | Si | copy / share | Comparte o copia el codigo |
| Icono recompensa | Icono | Opcional | visible / hidden | Refuerzo visual |
| Panel promo | Visual | Si | brand green | Area creativa de invitacion |

### Layout

| Zona | Elementos | Comportamiento |
| --- | --- | --- |
| Superior | Balance + icono | Siempre visible |
| Medio | Lista rewards | Solo si hay mas de una recompensa |
| Inferior | Regalo + copy promo + codigo + icono copiar/compartir | Accion principal |
| Contenedor | Stack vertical | Jerarquia clara |

### Properties (Figma)

| Property | Valores |
| --- | --- |
| `rewardState` | empty / single / multiple |
| `hasBreakdown` | true / false |
| `codeVisible` | true / false |
| `ctaType` | copy / share / invite |
| `emphasis` | balance / code |
| `density` | compact / default |
| `theme` | light / promo |
| `interaction` | static / interactive |

### States

| Estado | Descripcion |
| --- | --- |
| Empty | Sin recompensas; foco en codigo/invitacion |
| Single reward | Un reward acumulado |
| Multiple rewards | Total + breakdown visible |
| Active | Codigo disponible |
| Inactive | Codigo no usable |

## AI Spec

### Objetivo

Mostrar el estado de recompensas del usuario y activar la generacion de nuevas recompensas mediante invitacion.

Combina:

- Feedback: lo que el usuario ya tiene.
- Activacion: como ganar mas.

### Cuando usarlo

- Existe un sistema de recompensas.
- El usuario tiene o puede generar rewards.
- Se quiere incentivar conversion: invitar, compartir o copiar codigo.

### Cuando no usarlo

- No hay sistema de rewards.
- Solo hay un dato simple sin accion asociada: usar card simple.
- La accion de invitacion no existe o no esta disponible.

### Estructura logica

Subcard 1: balance total y breakdown opcional.

Subcard 2: codigo de referido y accion unica de compartir/copiar.

### Reglas de contenido

**Balance:** mostrar total acumulado con tono positivo. Preferir “Ya tienes 25€ acumulados” sobre “Tienes 25€ acumulados”.

**Breakdown:** solo si hay multiples rewards. Formato: `25€ · Se activan el 9 de febrero`.

**Codigo:** visible si esta activo; formato claro, legible y copiable.

**Accion:** en el diseno actual no hay CTA textual; se usa codigo + icono de copiar/compartir.

### Reglas de interaccion

- Subcard balance es informativa.
- Subcard codigo contiene la accion principal.
- Debe haber una sola accion clara: compartir o copiar codigo.
- El codigo debe poder copiarse o compartirse.

### Reglas visuales

- Separar claramente balance y activacion.
- Balance tiene mayor jerarquia visual.
- El panel de activacion debe ser creativo, usar verdes de marca y reforzarse con icono de regalo.
- Codigo y copy/share icon activan conversion sin saturar.
- No mostrar demasiados rewards; si hay muchos, resumir.

### Insight

Este componente representa un loop de comportamiento:

1. Ves recompensa.
2. Ves codigo.
3. Compartes.
4. Generas mas recompensa.

## Use Cases

### Genericos

| Caso | Comportamiento |
| --- | --- |
| Usuario sin rewards | Mostrar codigo e incentivo |
| Usuario con rewards | Mostrar balance |
| Usuario con multiples rewards | Mostrar breakdown |
| Usuario activo | Mostrar codigo |

### Producto Musky

| Caso | Copy |
| --- | --- |
| 1 reward | Ya tienes 25€ acumulados |
| Multiples | 50€ acumulados + desglose |
| Codigo | Tu codigo es ORI02321 |
| Activacion | Invita y gana mas recompensas |

### Diferencias generico vs producto

| Generico | Musky |
| --- | --- |
| Rewards abstractos | Incentivo monetario |
| CTA generico | Invitar amigos |
| Breakdown opcional | Fechas clave de activacion |

## Data Model

Los campos compartidos estan en `data/ui-fields.json`. Resumen:

| field_id | Rol |
| --- | --- |
| `reward_id` | ID de recompensa |
| `reward_amount` | Cantidad |
| `reward_currency` | Moneda |
| `reward_status` | Estado de recompensa |
| `reward_activation_date` | Fecha de activacion |
| `rewards_total` | Total acumulado |
| `rewards_count` | Numero de rewards |
| `referral_code` | Codigo de usuario |
| `referral_status` | Estado del codigo |
| `referral_action_type` | copy / share |
| `referral_target` | Destino de accion |
| `reward_source` | Origen |
| `is_reward_available` | Disponibilidad |
| `campaign_id` | Campana asociada |

## Tokens

### Codigo (CSS)

| Uso | Tokens principales |
| --- | --- |
| Card | `--semantic-background-surface`, `--semantic-border-subtle`, `--radius-md`, `--space-*` |
| Highlight reward | `--semantic-rewards-highlight-*` |
| Brand promo panel | `color/brand/green/accentDeep`, `color/brand/green/promoLime` |
| Ajustes propios | `component/doubleRewardCard/*` |
| Texto | `--semantic-text-primary`, `--semantic-text-secondary` |
| Accion compartir | `--semantic-action-link-text`, `--semantic-icon-primary` |
| Focus | `--semantic-focus-ring` |

### Figma (coleccion Musky — UI Tokens)

| Uso en el componente | Path de variable |
| --- | --- |
| Fondo subcards | `semantic/background/surface` |
| Borde subcards | `semantic/border/subtle` |
| Radio subcards | `radius/md` |
| Padding subcards | `space/*` y tokens propios solo cuando el layout compuesto lo necesita |
| Icono reward | `semantic/rewards/highlight/bg`, `semantic/rewards/highlight/icon` |
| Panel verde | `color/brand/green/accentDeep`, `color/brand/green/promoLime`, `color/spring green/*` |
| Regalo | `color/brand/pink`, `color/brand/wine` |
| Radios, sizing y espaciado propios | `component/doubleRewardCard/balance/*`, `component/doubleRewardCard/promoPanel/*`, `component/doubleRewardCard/codePill/*`, `component/doubleRewardCard/rewardBadge/*`, `component/doubleRewardCard/referralStack/*` |
| Iconos dibujados | `component/doubleRewardCard/gift/*`, `component/doubleRewardCard/copyIcon/*` |
| Tipografia local | `component/doubleRewardCard/amountEmpty/*`, `component/doubleRewardCard/promoTitle/*`, `component/doubleRewardCard/referralCode/*` |
| Texto principal | `semantic/text/primary` |
| Texto secundario | `semantic/text/secondary` |
| Share icon | `semantic/icon/primary` |

## Accessibility

- Role recomendado: region con nombre “Recompensas”.
- Balance y breakdown se anuncian como contenido informativo.
- Codigo se anuncia completo cuando esta visible.
- Share icon debe ser un boton con nombre accesible, por ejemplo `Compartir codigo ORI02321`.
- No depender solo del icono para comunicar la accion.

### QA Checklist

- Balance y codigo estan visualmente separados.
- Share icon tiene nombre accesible.
- Codigo es legible y copiable/compartible.
- Breakdown solo aparece cuando aporta informacion.
- El componente no muestra mas de una accion principal.

## Figma Contract

- File: `https://www.figma.com/design/q9gY8GgGHuGhrQ4iZ7Uo1e/Components`
- Pagina: `Rewards`
- Component set **Double Reward Card** (`122:952`): variantes `rewardState=empty|single|multiple`.
- Visual actual: balance superior blanco + panel inferior verde de marca con regalo grande, mensaje de invitacion y pastilla de codigo.
- Estructura Figma: cada variante usa Auto Layout vertical; `Balance section` contiene `Balance header` + textos, `Referral promo panel` contiene decoracion absoluta controlada + `Reward gift visual` + `Referral content stack`, y `Referral code pill` usa Auto Layout horizontal.
- Los ajustes visuales no presentes en la escala global se tokenizan como `component/doubleRewardCard/*` para conservar la composicion sin forzar cambios de medida.
- La version mobile compacta reduce padding, altos y gaps desde tokens del componente, no desde overrides locales.
- El icono de regalo en codigo se renderiza como SVG inline con `viewBox` para evitar deformaciones al escalar.
- La documentacion visual sigue la estructura de `Action List`: definitions, component, data needed, focus/reading order, accessibility annotations y tokens.
- El diseno actual usa codigo + icono de compartir, no CTA textual.

## Code Contract

- Metadata: `packages/ui/src/components/DoubleRewardCard/DoubleRewardCard.metadata.json`
- Implementacion React: `packages/ui/src/components/DoubleRewardCard/DoubleRewardCard.tsx`
- Storybook: `packages/ui/src/components/DoubleRewardCard/DoubleRewardCard.stories.tsx`

## Notes And Decisions

- Es una card compuesta, no una card simple.
- El foco del patron es el loop de comportamiento: valor acumulado + accion de compartir.
- El bloque de accesibilidad debe ser propio del componente; los patrones especificos de Header permanecen en Header.
