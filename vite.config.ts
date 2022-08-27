import { resolve } from "path";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig((): UserConfig => {
	return {
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true
				}
			}
		},
		server: {
			host: "127.0.0.1",
			port: 3000,
			open: true,
			cors: true
		},
		plugins: [react(), eslintPlugin()]
	};
});
