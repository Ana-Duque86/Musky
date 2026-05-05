import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { StorybookConfig } from "@storybook/react-vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    const muskyUi = join(__dirname, "../../../packages/ui/src");
    config.resolve ??= {};
    const a = config.resolve.alias;
    if (Array.isArray(a)) {
      config.resolve.alias = [...a, { find: "@musky/ui", replacement: muskyUi }];
    } else {
      config.resolve.alias = { ...(typeof a === "object" && a && !Array.isArray(a) ? a : {}), "@musky/ui": muskyUi };
    }
    return config;
  }
};

export default config;
