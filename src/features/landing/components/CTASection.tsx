import { ArrowUpRight, BadgeCheck, HeartHandshake, Layers } from 'lucide-react';

export function CTASection() {
  return (
    <section id="planos" className="relative overflow-hidden bg-gradient-to-br from-violet-deep to-ink-900 py-20 text-paper-50 lg:py-28">
      <CtaBackdrop />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-paper-50/20 bg-paper-50/[0.05] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-50/80">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-spark" />
            começa em menos de 60 segundos
          </div>

          <h2 className="mt-6 font-display text-4xl font-black leading-[0.98] tracking-[-0.02em] sm:text-5xl lg:text-[68px]">
            Sua próxima aula
            <br />
            pode começar{' '}
            <span className="relative inline-block">
              <span className="font-display italic text-cyan-spark">hoje</span>
              <svg
                aria-hidden
                className="absolute -bottom-2 left-0 h-3 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 50 2, 100 6 T 198 4"
                  fill="none"
                  stroke="#A3E635"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h2>

          <p className="mt-6 max-w-xl font-body text-lg leading-[1.55] text-paper-50/75">
            Crie sua conta gratuita e tenha acesso a 3 projetos completos, BNCC
            mapeada e o fórum da comunidade. Sem cartão de crédito, sem
            promessa vaga.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/cadastro"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-cyan-spark px-6 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900 shadow-[4px_4px_0_0_#0E7490] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-paper-50 hover:shadow-[2px_2px_0_0_#0E7490]"
            >
              Criar Conta Grátis
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-paper-50/30 bg-transparent px-6 py-[14px] font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-paper-50 transition-all hover:border-paper-50 hover:bg-paper-50/[0.05]"
            >
              Conhecer Planos
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-50/65">
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-lime-spark" />
              14 dias premium grátis
            </li>
            <li className="flex items-center gap-1.5">
              <HeartHandshake className="h-3.5 w-3.5 text-rose-pulse" />
              Cancele quando quiser
            </li>
            <li className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-spark" />
              Plano Escola disponível
            </li>
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative aspect-[5/6] w-full max-w-[420px] mx-auto">
            <div className="absolute inset-0 -rotate-2 rounded-xl border-2 border-paper-50/15 bg-paper-50/[0.04] p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-paper-50/10 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-50/55">
                  card · plano professor
                </span>
                <span className="rounded-md bg-lime-spark px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900">
                  grátis
                </span>
              </div>
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-50/55">acesso</p>
                <p className="mt-1 font-display text-4xl font-black text-paper-50">R$ 0</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-50/55">por mês · para sempre</p>
              </div>
              <ul className="mt-6 space-y-2.5 border-t border-paper-50/10 pt-5 font-mono text-[11px] text-paper-50/85">
                {[
                  '3 projetos completos com código',
                  'Mapa BNCC por projeto',
                  'Fórum da comunidade',
                  'Suporte por e-mail',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-block h-3.5 w-3.5 shrink-0 rounded-sm border border-paper-50/30 bg-paper-50/[0.04]">
                      <span className="block h-full w-full scale-[0.55] rounded-[1px] bg-lime-spark" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-5 left-5 right-5 rounded-md border-2 border-paper-50/20 bg-violet-deep/80 px-4 py-3 text-center font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-paper-50/70">
                ative em 1 clique →
              </div>
            </div>

            <div className="absolute -right-3 top-12 rotate-[6deg] rounded-md border-2 border-paper-50 bg-cyan-spark px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900">
              sem cartão
            </div>
            <div className="absolute -left-3 bottom-16 -rotate-[4deg] rounded-md border-2 border-paper-50 bg-lime-spark px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900">
              14 dias pro
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(245,239,224,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,239,224,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-spark/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-lime-spark/20 blur-[120px]"
      />
    </>
  );
}
