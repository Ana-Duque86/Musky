import "../../../packages/ui/src/styles/tokens.css";
import type { Preview } from "@storybook/react-vite";
import { inject } from '@vercel/analytics';

// Inject Vercel Analytics
inject();

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
