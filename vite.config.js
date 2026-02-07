import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    // Base path para GitHub Pages
    // IMPORTANTE: Substitua 'elegance-shop' pelo nome do seu repositório
    base: "/elegance-shop/",
});
