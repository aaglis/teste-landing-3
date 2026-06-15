import { Link } from '@tanstack/react-router'

function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      {/* background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Feito com TanStack Start
        </div>

        <h1 className="mb-6 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl md:text-7xl">
          Sua presenca digital
          <br />
          comecando agora
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Uma landing page moderna, rapida e responsiva construida com as tecnologias
          mais recentes do ecossistema React.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98]"
          >
            Comecar agora
          </Link>
          <a
            href="https://tanstack.com/start"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 py-3.5 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 active:scale-[0.98]"
          >
            Documentacao
          </a>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: 'React 19',
    desc: 'A versao mais recente do React com Server Components, Actions e hydration otimizado.',
  },
  {
    title: 'TanStack Router',
    desc: 'Roteamento file-based tipado, prefetching inteligente e navegacao SPA sem recarregar.',
  },
  {
    title: 'SSR & Streaming',
    desc: 'Renderizacao no servidor com streaming progressivo para entregar conteudo mais rapido.',
  },
  {
    title: 'Tailwind CSS v4',
    desc: 'Utilitarios modernos com CSS nativo, performance superior e zero configuracao.',
  },
  {
    title: 'TypeScript',
    desc: 'Tipagem forte de ponta a ponta, do servidor ao cliente, com seguranca em tempo de compilacao.',
  },
  {
    title: 'Vite 6',
    desc: 'Build extremamente rapido com HMR instantaneo e otimizacao de chunks em producao.',
  },
]

function Features() {
  return (
    <section className="px-6 py-24" id="recursos">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
          Tudo que voce precisa
        </h2>
        <p className="mb-16 text-center text-zinc-400">
          Tecnologias modernas para um resultado profissional.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
            >
              <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-blue-400">
                {f.title}
              </h3>
              <p className="leading-relaxed text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} — Feito com TanStack Start
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a href="#" className="hover:text-zinc-300 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-zinc-300 transition-colors">
            Contato
          </a>
        </div>
      </div>
    </footer>
  )
}

export function Landing() {
  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  )
}
