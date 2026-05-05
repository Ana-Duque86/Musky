# AI Index

This folder stores machine-readable maps for agents.

Expected files:

- `index.toon`: high-level component index.
- `relationships/component-usage.toon`: component graph and usage relationships.

Regenerate after adding or changing components:

```sh
npm run ai:index
```

The index should be read before generating pages or composing UI so agents reuse existing components instead of inventing new ones.
