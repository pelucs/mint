import './styles.css'

import { App } from './app'
import { Toaster } from './components/ui/toaster'
import { createRoot } from 'react-dom/client'
import { queryClient } from './lib/query-client'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster/>
    </QueryClientProvider>
  </ThemeProvider>
)
