# Musky Planning

## Component Documentation Template

Every documented component page in Figma must follow the exact structure used by `Header Documentation`.

1. **Title**
   - Page/component title.
   - Text layer, not a decorative card.

2. **Intro**
   - Short purpose summary.
   - Mention whether the component is standalone, a composition, or a system.

3. **Definitions**
   - Functional definitions and usage rules.
   - Include objective, when to use, when not to use, anatomy, properties, layout/spacing, states, interaction, fallbacks, and implementation notes.

4. **Component**
   - Main component or component set.
   - Must show variants/properties/booleans as a set when the component has states.
   - Do not leave variant assets as disconnected standalone components.
   - Focus must be a real component state/variant inside the set, not a detached overlay.

5. **Independent components / assets**
   - List and display child assets that remain independent.
   - Clarify which tokens belong to each child component.

6. **Data needed**
   - Shared data fields consumed by the component.
   - Use global data field names, not local one-off names.
   - Use a table with field, type, source/example, and how the component applies it.

7. **Focus state and reading order**
   - Visual focus states inside the component context.
   - SR/focus order in the real interaction sequence.
   - Decorative icons/badges do not receive separate SR order.
   - Include accessible labels such as `aria-label` for icon-only buttons and controls whose visual label is not enough.
   - Focus ring must sit 2px outside the element (`outline-offset: 2px` in code, outside stroke in Figma), never inside or on top of the content.

8. **Accessibility annotations — {Component} / Orden SR**
   - Same light look and feel as the rest of the documentation.
   - Include SR markers, expected announcements, interaction/focus notes, and QA checklist.

9. **Tokens**
   - Document token usage last.
   - Separate semantic intent from component-specific implementation tokens.
   - Parent systems must not claim child component tokens unless the section explicitly documents the child asset.
   - Include typography/text style tokens when text styles are applied in the component.
   - Apply Figma text styles to labels and documentation text instead of leaving raw text properties.

## Button System Documentation Restructure

Goal: restructure the Button System documentation so it follows the same documentation architecture used for Header, while keeping Button as a transversal action system, including the wine `tertiary` variant, and excluding `ghost`.

### Structure To Match Header

1. **Title**
   - Component name: `Button System`.
   - Short description: action system for CTA, secondary actions, tertiary wine actions, link actions, icon-only actions, and segmented selection.
   - Explicit rule: `ghost` is not part of the system; use `link` for low-emphasis actions.

2. **Intro**
   - Explain that Button is not one isolated component, but a system of actions.
   - Clarify which pieces are separate components:
     - `Button`
     - `IconButton`
     - `SegmentedControl`

3. **Definitions**
   - Restore a definition table like Header:
     - Objective
     - When to use
     - When not to use
     - Anatomy
     - Content rules
     - Interaction
     - States
     - No ghost rule
   - Include `Link button` as a first-class definition.

4. **Component**
   - Show the main visual assets:
     - Primary button
     - Disabled button
     - Secondary / outline button
     - Tertiary wine button
     - Link button
     - Icon buttons
     - Segmented control
   - Keep visuals on a white or light gray documentation background.

5. **Independent Components / Assets**
   - Document `Button`, `IconButton`, and `SegmentedControl` as independent component sets.
   - Each asset must be a set with variants/properties/booleans, not disconnected standalone components.
   - Keep component-specific tokens only in those component contracts.
   - Do not collapse `IconButton` into `Button`; it is part of the action system but remains an independent component.
   - `IconButton` must mirror the normal Button hierarchy as icon-only: `primary`, `secondary`, and `tertiary`; `secondary` is the default visual.
   - `SegmentedControl` must include its own accessibility/reading-order block because it contains multiple options inside one control.

6. **Data Needed**
   - Document the shared action data model:
     - `action_id`
     - `action_label`
     - `action_type`
     - `action_state`
     - `action_priority`
     - `action_target`
     - `action_payload`
     - `selection_value`
     - `selection_options`
     - `is_selected`
     - `is_available`

7. **Accessibility And Focus**
   - Add focus states for each interactive asset as real variants/properties inside the component set.
   - Use reading order:
     - Group / action region if needed
     - Primary button
     - Secondary or link button
     - Segmented options
     - Icon buttons
   - Icons are decorative when the button has an accessible label.
   - Each button row must document the spoken label, including `aria-label` when needed.
   - For segmented controls, document the group label and then each option in order, e.g. `radiogroup aria-label="Tipo de mascota"`, then `Perro, seleccionado, 1 de 2`, then `Gato, no seleccionado, 2 de 2`.

8. **Accessibility Annotations**
   - Use the same light look and feel as Header.
   - Include SR order markers, expected announcements, interaction/focus rules, and QA checklist.
   - Do not include decorative icons as separate SR items.

9. **Tokens**
   - Separate token layers clearly:
     - `semantic/action/*` for intention.
     - `component/button/*` for Button visuals.
     - `component/iconButton/*` for IconButton visuals.
     - `component/segmentedControl/*` for segmented visuals.
     - typography/text style tokens used by labels.
   - Avoid putting child component tokens in the parent `Button System` contract unless the section is explicitly documenting child assets.

### Implementation Steps

1. Rebuild the Figma `Button` page order to match Header documentation.
2. Rename and reorder sections to the shared pattern.
3. Add missing sections: `Independent components / assets`, `Accessibility and focus`.
4. Convert focus from detached visual overlays into actual `state=focus` variants in the component sets.
5. Keep the current `Accessibility annotations — Button System / Orden SR` but align its content with the new structure and include `aria-label` values.
6. Replace `Data needed` free text with a table that states how each field is applied.
7. Review the tokens table so semantic, component, and typography tokens are not mixed ambiguously.
8. Capture Figma screenshots for `Component`, `Accessibility annotations`, `Data needed`, and `Tokens`.
9. Validate code docs with `npm run typecheck`.
