import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import env from "vite-plugin-env-compatible";

export default defineConfig({
    test: {
        coverage: {
            provider: "istanbul",
            reportsDirectory: "./tests/coverage",
        },
    },
    plugins: [env()],
    resolve: {
        alias: {
            "@/": new URL("./src/", import.meta.url).pathname,
        },
    },
});
