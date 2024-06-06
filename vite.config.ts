import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from "vite-plugin-environment"
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tsConfigPaths(), EnvironmentPlugin("all")],
    define: {
      'process.env': process.env
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace('/', ''),
        },
      },
      port: Number(env.VITE_PORT) || 3000,
    },
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      emptyOutDir: true,
      commonjsOptions: {
        include: [/node_modules/]
      }
    },
  }
})