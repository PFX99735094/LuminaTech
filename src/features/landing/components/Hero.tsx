import { ArrowUpRight, PlayCircle, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink-900/10 bg-paper-50">
      <BackgroundGrid />
      <BackgroundSparks />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-paper-50/80 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/70 shadow-[0_1px_0_0_rgba(20,16,10,0.04)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-spark opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-spark" />
            </span>
            turma de jan/2026 · 47 competências bncc mapeadas
          </div>

          <h1 className="mt-7 font-display text-[44px] font-black leading-[0.96] tracking-[-0.02em] text-ink-900 sm:text-[60px] md:text-[68px] lg:text-[78px]">
            Robótica{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-cyan-spark">real</span>
              <svg
                aria-hidden
                className="absolute -bottom-1 left-0 z-0 h-3 w-full text-cyan-spark"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 50 2, 100 6 T 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            na sala de aula,
            <br />
            sem complicar o seu{' '}
            <span className="font-display italic text-ink-900/55">planejamento.</span>
          </h1>

          <p className="mt-7 max-w-xl font-body text-lg leading-[1.55] text-ink-900/75 md:text-[19px]">
            Projetos passo a passo, código pronto e materiais baratos. Tudo alinhado
            com a BNCC para você ensinar robótica <em className="text-cyan-spark">sem virar engenheiro</em>.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/cadastro"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md bg-violet-deep px-6 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-paper-50 shadow-[4px_4px_0_0_#4C1D95] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[2px_2px_0_0_#4C1D95]"
            >
              <Sparkles className="h-4 w-4" strokeWidth={2.25} />
              Criar Conta Grátis
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#projetos"
              className="group inline-flex items-center justify-center gap-2 rounded-md border-2 border-ink-900 bg-transparent px-6 py-[14px] font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-ink-900 hover:text-paper-50"
            >
              <PlayCircle className="h-4 w-4" strokeWidth={2.25} />
              Ver projetos prontos
            </a>
          </div>


        </div>

        <div className="relative lg:col-span-5">
          <HeroBlueprint />
        </div>
      </div>
    </section>
  );
}

function BackgroundGrid() {
  return (
    <div
      aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.42]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(7,11,20,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(7,11,20,0.10) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage:
          'radial-gradient(ellipse 80% 60% at 50% 35%, #000 50%, transparent 100%)',
      }}
    />
  );
}

function BackgroundSparks() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-cyan-spark/30 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lime-spark/15 blur-[120px]"
      />
    </>
  );
}

function HeroBlueprint() {
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto">
      <div className="absolute inset-0 rounded-2xl border-2 border-ink-900/15 bg-paper-50 shadow-[8px_8px_0_0_rgba(7,11,20,0.08)]">
        <div className="flex items-center justify-between border-b border-ink-900/10 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-pulse" />
            <span className="h-2 w-2 rounded-full bg-amber-glow" />
            <span className="h-2 w-2 rounded-full bg-lime-spark" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-900/55">
            arduino · uno r3
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-900/55">
            arduino · uno r3
          </span>
        </div>

        <div className="h-full w-full overflow-hidden p-3">
          <img
            src="https://eu.robotshop.com/cdn/shop/files/arduino-uno-r3-usb-microcontroller-01.webp"
            alt="Arduino Uno R3 - Placa microcontroladora"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="absolute -right-4 -top-4 rotate-3 rounded-md border-2 border-ink-900 bg-cyan-spark px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900 shadow-[3px_3px_0_0_#4C1D95]">
        passo 3/4
      </div>
      <div className="absolute -bottom-4 -left-4 -rotate-2 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900 shadow-[3px_3px_0_0_#4C1D95]">
        ↳ 47 bncc
      </div>
    </div>
  );
}
