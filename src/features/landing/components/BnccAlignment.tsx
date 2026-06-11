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
import { bnccPillars } from '../data/bnccAreas';
import { useEffect, useMemo, useState } from 'react';
import { fetchAllProjectsPublic } from '../data/projectsRepo';

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

const accentMap: Record<BnccPillar['accent'], { spark: string; deep: string }> = {
  amber: { spark: '#FBBF24', deep: '#B45309' },
  lime: { spark: '#A3E635', deep: '#4D7C0F' },
  cyan: { spark: '#22D3EE', deep: '#0E7490' },
  rose: { spark: '#FB7185', deep: '#BE123C' },
  violet: { spark: '#A78BFA', deep: '#6D28D9' },
  teal: { spark: '#2DD4BF', deep: '#0F766E' },
  orange: { spark: '#FB923C', deep: '#C2410C' },
  fuchsia: { spark: '#E879F9', deep: '#A21CAF' },
};

function useProjectCounts() {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchAllProjectsPublic();
      if (!cancelled) setList(data);
    }
    load();
    return () => { cancelled = true; };
  }, []);
  const countFor = useMemo(() => {
    const map = new Map<BnccArea, number>();
    for (const pillar of bnccPillars) map.set(pillar.area, 0);
    for (const p of list) {
      for (const area of p.bncc ?? []) {
        map.set(area as BnccArea, (map.get(area as BnccArea) ?? 0) + 1);
      }
    }
    return (area: BnccArea) => map.get(area) ?? 0;
  }, [list]);
  return countFor;
}

export function BnccAlignment() {
  const countFor = useProjectCounts();
  return (
    <section id="bncc" className="relative overflow-hidden bg-paper-50 py-20 lg:py-28">
      <SpecGrid />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 motion-safe:animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="md:col-span-7">
            <SectionLabel number="02" text="especificação técnica" />
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-[-0.03em] text-ink-900 sm:text-5xl lg:text-[58px]">
              Cada projeto
              <br />
              fala a língua da{' '}
              <span className="relative">
                <span className="font-display italic text-cyan-spark">BNCC</span>
                <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-cyan-spark/50" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }} />
              </span>.
            </h2>
          </div>
          <div className="flex items-end md:col-span-5 md:justify-end">
            <p className="max-w-sm font-body text-[15px] leading-[1.6] text-ink-700/80">
              9 áreas do conhecimento mapeadas, incluindo Robótica como disciplina
              integradora. Toda atividade vem com código de habilidade BNCC e
              rubrica de avaliação pronta.
            </p>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-5 motion-safe:animate-fade-up" style={{ animationDelay: '180ms' }}>
          {bnccPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];
            const count = countFor(pillar.area);
            const accent = accentMap[pillar.accent];
            return (
              <Link
                key={pillar.area}
                to="/bncc"
                className="group relative flex flex-col border-2 border-ink-900/20 bg-paper-50 transition-all duration-200 hover:-translate-y-1 hover:border-ink-900/40 hover:shadow-[6px_6px_0_0_rgba(34,211,238,0.12)]"
              >
                <div className="flex items-center justify-between border-b border-ink-900/10 bg-paper-100/40 px-3 py-1.5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-ink-700/50">
                    área {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded-sm border border-ink-900/20 bg-paper-50 px-2 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-ink-700/70">
                    {pillar.code}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-sm border-2 border-ink-900/20 bg-paper-100"
                      style={{ boxShadow: 'inset 0 0 0 1px rgba(158,172,194,0.06)' }}
                    >
                      <Icon className="h-4.5 w-4.5 text-ink-700" strokeWidth={2.25} />
                    </span>
                    <div>
                      <h3 className="font-display text-[18px] font-bold leading-tight text-ink-900">
                        {pillar.area}
                      </h3>
                      <p className="line-clamp-1 font-body text-[12px] text-ink-700/60">
                        {pillar.title}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 font-body text-[12.5px] leading-[1.55] text-ink-700/70">
                    {pillar.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink-900/10 pt-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-700/50">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent.spark }} />
                      {count} {count === 1 ? 'projeto' : 'projetos'}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-700/60 transition-colors group-hover:text-cyan-spark">
                      abrir
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:rotate-45" strokeWidth={2.5} />
                    </span>
                  </div>
                </div>

                <div className="pointer-events-none absolute bottom-2 right-2 font-mono text-[48px] font-black leading-none text-ink-900/[0.035] transition-colors group-hover:text-ink-900/[0.06]">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-sm border-2 border-dashed border-ink-900/20 bg-paper-100/50 p-5 sm:flex-row sm:items-center motion-safe:animate-fade-up" style={{ animationDelay: '240ms' }}>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-sm border-2 border-ink-900 bg-amber-glow font-mono text-[9px] font-bold">
              i
            </span>
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-ink-700/50">
                documentação completa
              </span>
              <p className="mt-1 font-body text-[14px] leading-[1.55] text-ink-700/80">
                Acesse a página da BNCC com busca por código de habilidade e a lista de competências de cada área — incluindo a nova disciplina de <strong>Robótica</strong>.
              </p>
            </div>
          </div>
          <Link
            to="/bncc"
            className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900 underline decoration-2 underline-offset-4 transition-colors hover:text-cyan-spark"
          >
            Abrir mapeamento BNCC →
          </Link>
        </div>
      </div>
    </section>
  );
}

function SpecGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.18]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(158,172,194,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(158,172,194,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
  );
}

function SectionLabel({ number, text }: { number: string; text: string }) {
  return (
    <div className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-700/70">
      <span className="grid h-6 w-6 place-items-center rounded-sm border-2 border-ink-900 bg-amber-glow font-bold text-ink-900 text-[11px]">
        {number}
      </span>
      <span>{text}</span>
      <span className="hidden h-px w-12 bg-ink-900/10 sm:block" />
    </div>
  );
}
