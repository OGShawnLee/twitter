import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
	theme: {
		extend: {
			colors: {
				zinc: {
					900: "#18181B",
					800: "#212127",
					700: "#2A2A37",
					600: "#414158",
					500: "#818198",
					400: "#9F9FAD",
					300: "#CACACE",
					200: "#D7D7DB",
					100: "#E4E4E7"
				}
			},
			fontFamily: {
				roboto: ["Roboto", "sans-serif"]
			}
		}
	}
});
