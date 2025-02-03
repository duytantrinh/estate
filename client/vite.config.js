import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import {config} from "dotenv"

config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		proxy: {
			"/api": {
				target: "https://estate-back.onrender.com",
			},
		},
	},
  define: {
    "process.env": process.env,
  },
})
