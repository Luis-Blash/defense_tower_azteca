import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/proyectos/defenseTower/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    glsl(),
  ],
  assetsInclude: ['**/*.hdr', "**/*.glb"],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@container': path.resolve(__dirname, 'src/container'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@three': path.resolve(__dirname, 'src/three'),
    },
  },
})
