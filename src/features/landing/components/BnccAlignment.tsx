import {
  ArrowUpRight,
  Beaker,
  Bot,
  BookOpen,
  Calculator,
  Globe2,
  Landmark,
  Palette,
  Sigma,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BnccArea, BnccPillar } from '../types';
import { projects } from '../data/projects';
import { bnccPillars } from '../data/bnccAreas';

const iconMap: Record<BnccPillar['icon'], LucideIcon> = {
  Calculator,
  Beaker,
  Sigma,
  Globe2,
  Palette,
  BookOpen,
  Landmark,
  Wrench,
  Bot,
};

const accentPill: Record<BnccPillar['accent'], string> = {
  amber: 'bg-amber-glow',
  lime: 'bg-lime-spark',
  cyan: 'bg-cyan-spark',
  rose: 'bg-rose-pulse',
  violet: 'bg-violet-spark',
  teal: 'bg-teal-spark',
  orange: 'bg-orange-spark',
  fuchsia: 'bg-fuchsia-spark',
};

function projectCount(area: BnccArea): number {
  return projects.filter((p) => p.bncc.includes(area)).length;
}

export function BnccAlignment() {
  return (
    <section id="bncc" className="relative overflow-hidden bg-paper-50 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(7,11,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(7,11,20,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-900/70">
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink-900 bg-amber-glow font-bold text-ink-900">
                02
              </span>
              <span>alinhamento pedagógico</span>
              <span className="hidden h-px w-12 bg-ink-900/20 sm:block" />
            </div>
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[58px]">
              Cada projeto
              <br />
              fala a língua da{' '}
              <span className="font-display italic text-cyan-spark">BNCC</span>.
            </h2>
          </div>
          <p className="font-body text-lg leading-[1.55] text-ink-900/70 md:col-span-5 md:max-w-md">
            9 áreas do conhecimento mapeadas, incluindo Robótica como disciplina
            integradora. Toda atividade vem com código de habilidade BNCC e
            rubrica de avaliação pronta.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:mt-16 lg:gap-5">
          {bnccPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];
            const count = projectCount(pillar.area);
            return (
              <Link
                key={pillar.area}
                to="/bncc"
                className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-ink-900 bg-paper-50 p-5 shadow-[5px_5px_0_0_#4C1D95] transition-all hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[7px_7px_0_0_#4C1D95]"
              >
                <div className="flex items-start justify-between border-b border-dashed border-ink-900/15 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 bg-paper-50 text-ink-900 shadow-[2px_2px_0_0_#4C1D95]">
                      <Icon className="h-4.5 w-4.5" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-900/55">
                        área {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-display text-[19px] font-bold leading-tight text-ink-900">
                        {pillar.area}
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-md border-2 border-ink-900 bg-cyan-spark px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900">
                    {pillar.code}
                  </span>
                </div>

                <h4 className="mt-4 font-display text-[16px] font-semibold leading-snug text-ink-900">
                  {pillar.title}
                </h4>
                <p className="mt-2 line-clamp-3 font-body text-[13.5px] leading-[1.5] text-ink-900/70">
                  {pillar.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink-900/15 pt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/60">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${accentPill[pillar.accent]}`} />
                    {count} {count === 1 ? 'projeto' : 'projetos'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-ink-900/70 transition-colors group-hover:text-cyan-spark">
                    ver
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
                  </span>
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-2 font-mono text-[64px] font-black leading-none text-ink-900/[0.04] transition-colors group-hover:text-ink-900/[0.07]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/60 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border-2 border-ink-900 bg-amber-glow">
              <span className="font-mono text-[10px] font-bold">i</span>
            </span>
            <p className="font-body text-[15px] leading-[1.55] text-ink-900/80">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/55">
                mapeamento completo
              </span>
              <br />
              Acesse a página da BNCC com busca por código de habilidade e a lista de competências de cada área — incluindo a nova disciplina de <strong>Robótica</strong>.
            </p>
          </div>
          <Link
            to="/bncc"
            className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-900 underline decoration-2 underline-offset-4 transition-colors hover:text-cyan-spark"
          >
            Abrir mapeamento BNCC →
          </Link>
        </div>
      </div>
    </section>
  );
}
