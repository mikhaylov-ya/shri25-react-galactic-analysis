import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    build: {
    rollupOptions: {
      input: 'src/app/main.tsx',
    },
    emptyOutDir: true,
  },
  publicDir: false,

  plugins: [react()],
})
