import { ArrowUpRight, PlayCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden border-b-2 border-ink-900/10 bg-paper-50">
      <SchematicGrid />
      <CircuitTraces />
      <GlowNodes />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 pb-20 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="lg:col-span-7 motion-safe:animate-fade-up" style={{ animationDelay: '80ms' }}>
          <div className="inline-flex items-center gap-3 rounded-sm border-2 border-ink-900/20 bg-paper-50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-700">
            <span className="h-1 w-4 bg-amber-glow" />
            rev. 2.4 · jan 2026
          </div>

          <h1 className="mt-8 font-display text-[48px] font-black leading-[0.92] tracking-[-0.03em] text-ink-900 sm:text-[64px] md:text-[76px] lg:text-[88px] motion-safe:animate-fade-up" style={{ animationDelay: '140ms' }}>
            Robótica{' '}
            <span className="relative">
              <span className="font-display italic text-cyan-spark">real</span>
              <DimensionLine />
            </span>{' '}
            na sala de aula,
            <br />
            sem complicar o seu{' '}
            <span className="font-display italic text-ink-700">planejamento.</span>
          </h1>

          <div className="relative mt-8 max-w-xl motion-safe:animate-fade-up" style={{ animationDelay: '200ms' }}>
            <LeaderLine className="absolute -left-6 top-2 hidden h-px w-4 bg-ink-700 md:block" />
            <p className="font-body text-lg leading-[1.6] text-ink-700 md:text-[19px]">
              Projetos passo a passo, código pronto e materiais baratos. Tudo alinhado
              com a BNCC para você ensinar robótica{' '}
              <em className="text-cyan-spark">sem virar engenheiro</em>.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-fade-up" style={{ animationDelay: '260ms' }}>
            <a
              href="/cadastro"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-sm bg-violet-deep px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper-50 shadow-[4px_4px_0_0_#3B0F8C] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[4px_4px_0_0_#0E7490]"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />
              Criar Conta Grátis
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm border-2 border-ink-900/30 bg-transparent px-7 py-[14px] font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900 hover:border-ink-900 hover:bg-ink-900/[0.04]"
            >
              <PlayCircle className="h-4 w-4" strokeWidth={2.5} />
              Ver projetos prontos
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-700/60 motion-safe:animate-fade-up" style={{ animationDelay: '320ms' }}>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm border border-ink-700/30 bg-ink-900/5" />
              47 competências BNCC
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm border border-ink-700/30 bg-cyan-spark/20" />
              8 projetos prontos
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm border border-ink-700/30 bg-amber-glow/20" />
              código aberto
            </span>
          </div>
        </div>

        <div className="relative lg:col-span-5 motion-safe:animate-fade-up" style={{ animationDelay: '380ms' }}>
          <SchematicBoard />
        </div>
      </div>

      <RevisionBlock />
    </section>
  );
}

function SchematicGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.3]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(158,172,194,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(158,172,194,0.08) 1px, transparent 1px),
          linear-gradient(to right, rgba(158,172,194,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(158,172,194,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px, 48px 48px, 12px 12px, 12px 12px',
        maskImage: 'radial-gradient(ellipse 70% 55% at 50% 40%, #000 40%, transparent 100%)',
      }}
    />
  );
}

function CircuitTraces() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="none"
    >
      <path d="M0 200 L200 200 L250 150 L400 150" stroke="#22D3EE" strokeWidth="1.5" />
      <circle cx="400" cy="150" r="3" fill="#22D3EE" />
      <path d="M200 200 L200 400 L300 500 L500 500" stroke="#22D3EE" strokeWidth="1" />
      <circle cx="500" cy="500" r="3" fill="#22D3EE" />
      <path d="M600 0 L600 100 L700 200 L900 200" stroke="#A78BFA" strokeWidth="1" />
      <circle cx="900" cy="200" r="3" fill="#A78BFA" />
      <path d="M1000 700 L1000 600 L1100 500 L1300 500" stroke="#A3E635" strokeWidth="1" />
      <circle cx="1300" cy="500" r="3" fill="#A3E635" />
      <path d="M300 800 L400 700 L600 700 L700 800" stroke="#FBBF24" strokeWidth="1" />
      <circle cx="700" cy="800" r="3" fill="#FBBF24" />
      <path d="M1100 100 L1200 100 L1300 200 L1440 200" stroke="#22D3EE" strokeWidth="1" />
      <circle cx="1440" cy="200" r="3" fill="#22D3EE" />
      <path d="M800 900 L800 750 L900 650 L1050 650" stroke="#FB7185" strokeWidth="1" />
      <circle cx="1050" cy="650" r="3" fill="#FB7185" />
      <path d="M0 600 L100 600 L150 550 L250 550" stroke="#A78BFA" strokeWidth="1" />
      <circle cx="250" cy="550" r="3" fill="#A78BFA" />
    </svg>
  );
}

function GlowNodes() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-cyan-spark/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-violet-spark/10 blur-[100px]"
      />
    </>
  );
}

function DimensionLine() {
  return (
    <span
      aria-hidden
      className="absolute -bottom-3 left-0 h-[3px] w-full bg-gradient-to-r from-cyan-spark via-cyan-spark to-transparent"
      style={{
        boxShadow: '0 0 12px rgba(34,211,238,0.3)',
        clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
      }}
    />
  );
}

function LeaderLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        background: 'repeating-linear-gradient(90deg, #9EACC2 0, #9EACC2 4px, transparent 4px, transparent 8px)',
      }}
    />
  );
}

function SchematicBoard() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <div className="relative aspect-square overflow-hidden rounded-sm border-2 border-ink-900/20 bg-paper-100 shadow-[10px_10px_0_0_rgba(7,11,20,0.25)]">
        <div className="flex items-center justify-between border-b border-ink-900/10 bg-paper-100/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-pulse" />
            <span className="h-2 w-2 rounded-full bg-amber-glow" />
            <span className="h-2 w-2 rounded-full bg-lime-spark" />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-ink-700/70">
              referencia · rev 2.4
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-ink-700/70">
              sheet 1/4
            </span>
          </div>
        </div>

        <div className="relative h-full w-full overflow-hidden p-3">
          <img
            src="https://eu.robotshop.com/cdn/shop/files/arduino-uno-r3-usb-microcontroller-01.webp"
            alt="Arduino Uno R3 - Placa microcontroladora"
            className="h-full w-full rounded-sm object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-paper-100/90 to-transparent px-3 pb-2 pt-6">
            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-ink-700/60">
              arduino uno r3
            </span>
            <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-ink-700/60">
              ref: A000066
            </span>
          </div>
        </div>
      </div>

      <AnnotationTag
        className="absolute -right-5 -top-5 rotate-3"
        text="passo 3/4"
        color="bg-cyan-spark"
      />
      <AnnotationTag
        className="absolute -bottom-5 -left-5 -rotate-2"
        text="47 bncc"
        color="bg-amber-glow"
      />
      <div className="absolute -right-6 bottom-12 hidden h-8 w-px bg-ink-700/30 lg:block">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[7px] uppercase tracking-[0.2em] text-ink-700/50">
          1:1
        </span>
      </div>
    </div>
  );
}

function AnnotationTag({ className, text, color }: { className?: string; text: string; color: string }) {
  return (
    <div
      className={`${className} ${color} rounded-sm border-2 border-ink-900 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900 shadow-[3px_3px_0_0_#4C1D95]`}
    >
      {text}
    </div>
  );
}

function RevisionBlock() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-6 right-6 hidden border border-ink-900/10 bg-paper-50/80 p-2 font-mono text-[6.5px] uppercase tracking-[0.2em] text-ink-700/40 lg:block"
    >
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-0.5">
        <span>rev</span>
        <span className="w-8 border-b border-ink-900/10" />
        <span>date</span>
        <span>2.4</span>
        <span className="border-b border-ink-900/10" />
        <span>2026-01</span>
        <span>2.3</span>
        <span className="border-b border-ink-900/10" />
        <span>2025-11</span>
        <span>2.2</span>
        <span className="border-b border-ink-900/10" />
        <span>2025-08</span>
      </div>
    </div>
  );
}
