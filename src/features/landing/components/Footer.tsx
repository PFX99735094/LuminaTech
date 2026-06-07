import { Cpu, Instagram, Mail, MessageCircle, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const columns: { title: string; links: { label: string; href: string; route?: boolean }[] }[] = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Projetos', href: '/projetos', route: true },
      { label: 'BNCC', href: '#bncc' },
      { label: 'Planos', href: '#planos' },
      { label: 'Comunidade', href: '#comunidade' },
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
        <div className="grid grid-cols-1 gap-10 border-b-2 border-ink-900/15 pb-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-violet-deep text-paper-50">
                <Cpu className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-bold tracking-tight text-ink-900">
                  Lúmina Tech
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-900/55">
                  robótica para a escola pública
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-md font-body text-[15px] leading-[1.55] text-ink-900/70">
              Feito por educadores e engenheiros brasileiros que acreditam que
              toda escola — e não só as particulares — pode ensinar robótica
              de verdade.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {[Instagram, Youtube, MessageCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-md border-2 border-ink-900 bg-paper-50 text-ink-900 transition-all hover:-translate-y-0.5 hover:translate-x-[-1px] hover:bg-cyan-spark hover:shadow-[2px_2px_0_0_#4C1D95]"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" strokeWidth={2.25} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-ink-900/55">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 font-body text-[14.5px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.route ? (
                      <Link
                        to={link.href}
                        className="text-ink-900/80 transition-colors hover:text-cyan-spark"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-ink-900/80 transition-colors hover:text-cyan-spark"
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
            <div className="rotate-3 rounded-md border-2 border-ink-900 bg-amber-glow px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900">
              feito<br />no<br />Brasil
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/55">
            © 2026 Lúmina Tech · CNPJ 00.000.000/0001-00
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/55">
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

      <div className="relative overflow-hidden border-t-2 border-ink-900 bg-gradient-to-r from-violet-deep to-ink-900 py-6 text-paper-50">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <p className="whitespace-nowrap font-display text-[64px] font-black leading-none tracking-[-0.04em] text-paper-50/[0.08] sm:text-[120px] lg:text-[160px]">
            ATELIÊ.ROBÔ / 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
