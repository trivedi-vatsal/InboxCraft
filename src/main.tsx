import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import posthog from 'posthog-js'
import './index.css'
import App from './App'

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com',
  defaults: '2026-01-30',
  person_profiles: 'always',
  capture_pageview: true,
  capture_pageleave: true,
  autocapture: true,
  session_recording: {
    maskAllInputs: true,
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
