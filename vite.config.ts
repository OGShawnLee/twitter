import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";
import { sveltekit } from "@sveltejs/kit/vite";
import { resolve } from "path";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
	plugins: [sveltekit(), windicss()],
	resolve: {
		alias: {
			"@root": resolve("src"),
			"@root/*": resolve("src/*")
		}
	},
	server: {
		port: 3000
	}
});
