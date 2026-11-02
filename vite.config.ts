// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/restruantsolvaindemo/",
  },
  // Static output for GitHub Pages (no Cloudflare worker). Writes .output/public.
  nitro: { preset: "static" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: { basepath: "/restruantsolvaindemo" },
    pages: [
      { path: "/restruantsolvaindemo/" },
      { path: "/restruantsolvaindemo/menu" },
      { path: "/restruantsolvaindemo/about" },
      { path: "/restruantsolvaindemo/gallery" },
      { path: "/restruantsolvaindemo/reserve" },
      { path: "/restruantsolvaindemo/contact" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
  },
});
