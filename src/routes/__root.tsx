import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import type { ReactNode } from 'react'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Landing Page — TanStack Start' },
      { name: 'description', content: 'Uma landing page moderna com TanStack Start, TypeScript e Tailwind CSS' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
