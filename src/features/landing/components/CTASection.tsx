import { ArrowUpRight, BadgeCheck, HeartHandshake, Layers } from 'lucide-react';

export function CTASection() {
  return (
    <section id="planos" className="relative overflow-hidden bg-gradient-to-br from-violet-deep to-ink-900 py-20 text-paper-50 lg:py-28">
      <OrderBackdrop />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7 motion-safe:animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="inline-flex items-center gap-3 rounded-sm border border-paper-50/15 bg-paper-50/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-paper-50/70">
            <span className="h-1 w-4 bg-lime-spark" />
            ordem de serviço · n° 0001
          </div>

          <h2 className="mt-6 font-display text-4xl font-black leading-[0.96] tracking-[-0.03em] sm:text-5xl lg:text-[68px] motion-safe:animate-fade-up" style={{ animationDelay: '180ms' }}>
            Sua próxima aula
            <br />
            pode começar{' '}
            <span className="relative">
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
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h2>

          <p className="mt-6 max-w-xl font-body text-[17px] leading-[1.6] text-paper-50/75 motion-safe:animate-fade-up" style={{ animationDelay: '240ms' }}>
            Crie sua conta gratuita e tenha acesso a 3 projetos completos, BNCC
            mapeada. Sem cartão de crédito, sem
            promessa vaga.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row motion-safe:animate-fade-up" style={{ animationDelay: '300ms' }}>
            <a
              href="/cadastro"
              className="group inline-flex items-center justify-center gap-2.5 rounded-sm bg-cyan-spark px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900 shadow-[4px_4px_0_0_#0E7490] hover:bg-paper-50 hover:text-ink-900 hover:shadow-[4px_4px_0_0_#22D3EE]"
            >
              Criar Conta Grátis
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm border-2 border-paper-50/25 bg-transparent px-6 py-[14px] font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper-50 hover:border-paper-50 hover:bg-paper-50/[0.05]"
            >
              Conhecer Planos
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.22em] text-paper-50/60 motion-safe:animate-fade-up" style={{ animationDelay: '360ms' }}>
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="h-3 w-3 text-lime-spark" strokeWidth={2.5} />
              14 dias premium grátis
            </li>
            <li className="flex items-center gap-1.5">
              <HeartHandshake className="h-3 w-3 text-rose-pulse" strokeWidth={2.5} />
              Cancele quando quiser
            </li>
            <li className="flex items-center gap-1.5">
              <Layers className="h-3 w-3 text-cyan-spark" strokeWidth={2.5} />
              Plano Escola disponível
            </li>
          </ul>
        </div>

        <div className="relative lg:col-span-5 motion-safe:animate-fade-up" style={{ animationDelay: '360ms' }}>
          <PricingOrder />
        </div>
      </div>
    </section>
  );
}

function PricingOrder() {
  return (
    <div className="relative w-full max-w-[440px] mx-auto">
      <div className="relative border border-paper-50/15 bg-paper-50/[0.03] p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-paper-50/10 pb-3">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-paper-50/50">
              pedido de acesso
            </span>
            <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-paper-50/40">n° 0001-2026</p>
          </div>
          <span className="rounded-sm border border-lime-spark/30 bg-lime-spark/15 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-lime-spark">
            grátis
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-end justify-between border-b border-paper-50/10 pb-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-paper-50/40">item</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-paper-50/40">valor</span>
          </div>

          <table className="mt-2 w-full font-mono text-[10px]">
            <tbody>
              {[
                { item: 'Acesso a 3 projetos completos', value: 'R$ 0,00' },
                { item: 'Código-fonte comentado', value: 'R$ 0,00' },
                { item: 'Mapa BNCC por projeto', value: 'R$ 0,00' },
                { item: 'Suporte por e-mail', value: 'R$ 0,00' },
                { item: 'Plano Premium (14 dias)', value: 'R$ 0,00' },
              ].map((row) => (
                <tr key={row.item} className="border-b border-paper-50/5">
                  <td className="py-1.5 text-paper-50/75">{row.item}</td>
                  <td className="py-1.5 text-right text-paper-50/75">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 flex items-center justify-between border-t border-paper-50/20 pt-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-50/50">total</span>
            <span className="font-display text-[28px] font-black text-paper-50">R$ 0</span>
          </div>
          <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-paper-50/40">por mês · para sempre</p>
        </div>

        <div className="mt-4 rounded-sm border border-paper-50/10 bg-violet-deep/60 px-3 py-2.5 text-center font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-paper-50/70">
          ative em 1 clique →
        </div>
      </div>

      <div className="absolute -right-3 top-12 rotate-[6deg] rounded-sm border border-paper-50 bg-cyan-spark px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-900">
        sem cartão
      </div>
      <div className="absolute -left-3 bottom-20 -rotate-[4deg] rounded-sm border border-paper-50 bg-lime-spark px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-900">
        14 dias pro
      </div>
    </div>
  );
}

function OrderBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245,239,224,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245,239,224,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 30%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-spark/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-lime-spark/10 blur-[120px]"
      />
    </>
  );
}
