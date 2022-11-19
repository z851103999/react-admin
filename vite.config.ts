import { resolve } from "path";
import { defineConfig, UserConfig, loadEnv, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import { wrapperEnv } from "./src/utils/getEnv";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";

export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					additionalData: `@import "@/styles/var.less";`
				}
			}
		},
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			proxy: {
				"/hooks": {
					target: "https://mock.mengxuegu.com/mock/62abda3212c1416424630a45", // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
		plugins: [
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
						// https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
					}
				}
			}),
			react(),
			// eslint 报错显示道浏览器上
			eslintPlugin(),
			// svg
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),
			// gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: "gzip",
					ext: ".gz"
				})
		]
	};
});
