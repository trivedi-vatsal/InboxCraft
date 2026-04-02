import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { parse as parseYaml } from 'yaml'
import path from 'path'

function yamlPlugin(): Plugin {
  return {
    name: 'yaml',
    transform(code, id) {
      if (!id.endsWith('.yaml') && !id.endsWith('.yml')) return null
      const parsed = parseYaml(code)
      return { code: `export default ${JSON.stringify(parsed)}`, map: null }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    plugins: [react(), yamlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'import.meta.env.VITE_POSTHOG_KEY': JSON.stringify(env.VITE_POSTHOG_KEY ?? ''),
      'import.meta.env.VITE_POSTHOG_HOST': JSON.stringify(env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com'),
    },
  }
})
