import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";
import { sveltekit } from "@sveltejs/kit/vite";
import { resolve } from "path";

export default defineConfig({
	plugins: [sveltekit(), windicss()],
	resolve: {
		alias: {
			"@root": resolve("src"),
			"@root/*": resolve("src/*")
		}
	}
});
