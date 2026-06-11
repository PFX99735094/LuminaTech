import { Cpu, Instagram, Mail, MessageCircle, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const columns: { title: string; links: { label: string; href: string; route?: boolean }[] }[] = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Projetos', href: '/projetos', route: true },
      { label: 'BNCC', href: '#bncc' },
      { label: 'Planos', href: '#planos' },
    ],
  },
  {
    title: 'Para Professores',
    links: [
      { label: 'Central de ajuda', href: '#' },
      { label: 'Mapa BNCC completo', href: '#' },
      { label: 'Webinars gratuitos', href: '#' },
      { label: 'Material de impressão', href: '#' },
    ],
  },
  {
    title: 'Lúmina Tech',
    links: [
      { label: 'Sobre nós', href: '#' },
      { label: 'Manifesto', href: '#' },
      { label: 'Trabalhe conosco', href: '#' },
      { label: 'Imprensa', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-paper-100 pt-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b-2 border-ink-900/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-sm bg-violet-deep text-paper-50">
                <Cpu className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-bold tracking-tight text-ink-900">
                  Lúmina Tech
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-700/50">
                  robótica para a escola pública
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-md font-body text-[14px] leading-[1.6] text-ink-700/70">
              Feito por educadores e engenheiros brasileiros que acreditam que
              toda escola — e não só as particulares — pode ensinar robótica
              de verdade.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {[Instagram, Youtube, MessageCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-sm border-2 border-ink-900/20 bg-paper-50 text-ink-700 transition-all hover:-translate-y-0.5 hover:border-cyan-spark/30 hover:bg-cyan-spark/10 hover:text-cyan-spark"
                  aria-label="social"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-ink-700/50">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2 font-body text-[13.5px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.route ? (
                      <Link
                        to={link.href}
                        className="text-ink-700/70 transition-colors hover:text-cyan-spark"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-ink-700/70 transition-colors hover:text-cyan-spark"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <div className="rotate-3 rounded-sm border-2 border-ink-900/20 bg-amber-glow/90 px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-900">
              feito<br />no<br />Brasil
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-700/50">
            © 2026 Lúmina Tech · CNPJ 00.000.000/0001-00
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-700/50">
            <li>
              <a href="#" className="hover:text-ink-900">
                privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ink-900">
                termos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ink-900">
                lgpd
              </a>
            </li>
            <li className="hidden sm:block">v1.0.0-beta</li>
            <li>
              <Link to="/admin" className="hover:text-cyan-spark">
                ⚙ admin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Title Block — engineering drawing footer */}
      <TitleBlock />
    </footer>
  );
}

function TitleBlock() {
  return (
    <div className="border-t-2 border-ink-900 bg-paper-50">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-0 font-mono text-[7px] uppercase tracking-[0.18em] text-ink-700/35 sm:grid-cols-4">
          <div className="border-r border-ink-900/10 px-3 py-2">
            <span className="block">projeto</span>
            <span className="block text-ink-700/60">Lúmina Tech</span>
          </div>
          <div className="border-r border-ink-900/10 px-3 py-2">
            <span className="block">título</span>
            <span className="block text-ink-700/60">Plataforma de Robótica Educacional</span>
          </div>
          <div className="border-r border-ink-900/10 px-3 py-2">
            <span className="block">revisão</span>
            <span className="block text-ink-700/60">v1.0.0-beta</span>
          </div>
          <div className="px-3 py-2">
            <span className="block">data</span>
            <span className="block text-ink-700/60">2026-01-15</span>
          </div>
        </div>
        <div className="border-t border-ink-900/10">
          <p className="px-3 py-3 font-display text-[40px] font-black leading-none tracking-[-0.04em] text-ink-900/[0.06] sm:text-[80px] lg:text-[120px]">
            ATELIÊ.ROBÔ / 2026
          </p>
        </div>
      </div>
    </div>
  );
}
