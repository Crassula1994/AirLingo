/* eslint-disable */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        eslintPlugin({
            cache: false,
        }),
    ],
    server: {
        open: true,
        port: 5173,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});