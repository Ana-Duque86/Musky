import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { StorybookConfig } from "@storybook/react-vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-docs"],
  // Web Analytics: run in the manager only. Map each Storybook ?path=… to a virtual URL so the
  // dashboard lists stories (e.g. /story/…, /docs/…) instead of / and /iframe.html.
  managerHead: (head) =>
    process.env.NODE_ENV === "production"
      ? `${head}
    <script
      defer
      src="/_vercel/insights/script.js"
      data-sdkn="@vercel/analytics/storybook"
      data-sdkv="2.0.1"
      data-disable-auto-track="1"
    ></script>
    <script defer>
      (function () {
        function storyPathFromLocation() {
          try {
            var raw = new URLSearchParams(window.location.search).get("path");
            if (raw) return raw.charAt(0) === "/" ? raw : "/" + raw;
          } catch (e) {}
          return "/";
        }
        function sendStoryPageview() {
          if (!window.va) return;
          var p = storyPathFromLocation();
          window.va("pageview", { path: p, route: p });
        }
        function hookHistory() {
          var push = history.pushState;
          history.pushState = function () {
            push.apply(history, arguments);
            sendStoryPageview();
          };
          var replace = history.replaceState;
          history.replaceState = function () {
            replace.apply(history, arguments);
            sendStoryPageview();
          };
          window.addEventListener("popstate", sendStoryPageview);
          sendStoryPageview();
        }
        hookHistory();
      })();
    </script>`
      : head,
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
