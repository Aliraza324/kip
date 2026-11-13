import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Permissions-Policy': 'unload=(self)',
    },
  },
  define: {
    'process.env.IS_PREACT': JSON.stringify('false'),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: [
      '@fullcalendar/react',
      '@fullcalendar/react/daygrid',
      '@fullcalendar/react/timegrid',
      '@fullcalendar/react/list',
      '@fullcalendar/core',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('lucide-react') || id.includes('framer-motion')) {
              return 'vendor-ui'
            }
            return 'vendor'
          }
          if (id.includes('src/features/auth')) {
            return 'chunk-auth'
          }
          if (id.includes('src/features/students') || id.includes('src/features/student')) {
            return 'chunk-student'
          }
          if (id.includes('src/features/teachers') || id.includes('src/features/teacher')) {
            return 'chunk-teacher'
          }
          if (id.includes('src/features/admin')) {
            return 'chunk-admin'
          }
          if (id.includes('src/features/landing')) {
            return 'chunk-landing'
          }
        },
      },
    },
  },
})
