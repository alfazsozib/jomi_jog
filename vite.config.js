import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  build: {
    outDir: 'dist', // Vercel needs this
  },
  server: {
    host: true,     // helpful if you also test on mobile via Wi-Fi
  },
})
