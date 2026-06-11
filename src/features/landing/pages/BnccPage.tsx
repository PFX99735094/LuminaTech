import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Beaker,
  Bot,
  BookOpen,
  Calculator,
  Globe2,
  Landmark,
  Palette,
  Search,
  Sigma,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { BnccArea, BnccPillar } from '../types';
import { fetchAllProjectsPublic } from '../data/projectsRepo';
import { bnccCompetencies, bnccPillars } from '../data/bnccAreas';

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

const accentChip: Record<BnccPillar['accent'], string> = {
  amber: 'bg-amber-glow',
  lime: 'bg-lime-spark',
  cyan: 'bg-cyan-spark',
  rose: 'bg-rose-pulse',
  violet: 'bg-violet-spark',
  teal: 'bg-teal-spark',
  orange: 'bg-orange-spark',
  fuchsia: 'bg-fuchsia-spark',
};

const accentText: Record<BnccPillar['accent'], string> = {
  amber: 'text-amber-deep',
  lime: 'text-lime-deep',
  cyan: 'text-cyan-deep',
  rose: 'text-rose-deep',
  violet: 'text-violet-deep',
  teal: 'text-teal-deep',
  orange: 'text-orange-deep',
  fuchsia: 'text-fuchsia-deep',
};

function useProjects() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchAllProjectsPublic();
        if (!cancelled) setList(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);
  return { list, loading };
}

export function BnccPage() {
  const [activeArea, setActiveArea] = useState<BnccArea | 'Todas'>('Todas');
  const [search, setSearch] = useState('');
  const { list: projects, loading } = useProjects();

  const filteredAreas = useMemo(() => {
    const term = search.trim().toLowerCase();
    return bnccPillars.filter((pillar) => {
      if (activeArea !== 'Todas' && pillar.area !== activeArea) return false;
      if (!term) return true;
      const inArea =
        pillar.area.toLowerCase().includes(term) ||
        pillar.title.toLowerCase().includes(term) ||
        pillar.code.toLowerCase().includes(term) ||
        pillar.description.toLowerCase().includes(term);
      const inCompetencies = pillar.competencies.some((c) => c.toLowerCase().includes(term));
      const inCatalog = bnccCompetencies[pillar.competencies[0]?.split(' — ')[0] ?? '']?.title
        .toLowerCase()
        .includes(term);
      return inArea || inCompetencies || inCatalog;
    });
  }, [activeArea, search]);

  return (
    <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
      <BnccHeader />

      <main>
        <section className="relative overflow-hidden border-b-2 border-ink-900/10 bg-paper-100">
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
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-cyan-spark/30 blur-[120px]"
          />

          <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-12 lg:px-10 lg:pb-16 lg:pt-16">
            <Link
              to="/"
              className="group mb-6 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900/65 transition-colors hover:text-ink-900"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Voltar para a home
            </Link>

            <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-900/70">
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink-900 bg-amber-glow font-bold text-ink-900">
                BNCC
              </span>
              <span>mapeamento pedagógico</span>
              <span className="hidden h-px w-12 bg-ink-900/20 sm:block" />
            </div>

            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[0.98] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[60px]">
              A <span className="font-display italic text-cyan-spark">Robótica</span> é uma disciplina.{' '}
              <span className="text-ink-900/55">E fala a língua da BNCC.</span>
            </h1>
            <p className="mt-5 max-w-2xl font-body text-[17px] leading-[1.55] text-ink-900/80">
              9 áreas do conhecimento mapeadas com habilidades EF (Ensino Fundamental) e códigos
              prontos para copiar no seu plano de aula. Robótica entra como disciplina
              integradora — atribui habilidades próprias e ancora as demais áreas em prática.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/65">
              <span className="rounded-md border-2 border-ink-900 bg-paper-50 px-2.5 py-1 font-bold text-ink-900">
                9 áreas
              </span>
              <span className="rounded-md border-2 border-ink-900 bg-paper-50 px-2.5 py-1 font-bold text-ink-900">
                {Object.keys(bnccCompetencies).length}+ habilidades
              </span>
              <span className="rounded-md border-2 border-ink-900 bg-paper-50 px-2.5 py-1 font-bold text-ink-900">
                {projects.length} projetos
              </span>
            </div>
          </div>
        </section>

        <section className="bg-paper-50 py-10 lg:py-14">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {(['Todas', ...bnccPillars.map((p) => p.area)] as const).map((area) => {
                  const active = area === activeArea;
                  const Icon = area === 'Todas' ? null : iconMap[bnccPillars.find((p) => p.area === area)!.icon];
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setActiveArea(area)}
                      className={`inline-flex items-center gap-1.5 rounded-md border-2 border-ink-900 px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] transition-all ${
                        active
                          ? 'bg-violet-deep text-paper-50 shadow-[2px_2px_0_0_#22D3EE]'
                          : 'bg-paper-50 text-ink-900 hover:bg-paper-100'
                      }`}
                    >
                      {Icon && <Icon className="h-3 w-3" strokeWidth={2.5} />}
                      {area}
                    </button>
                  );
                })}
              </div>

              <label className="group flex w-full items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 focus-within:shadow-[3px_3px_0_0_#4C1D95] lg:w-80">
                <Search className="h-4 w-4 text-ink-900/55" strokeWidth={2.5} />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por código (EF07MA12) ou palavra…"
                  className="w-full bg-transparent font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:outline-none"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="bg-paper-50 pb-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            {loading ? (
              <div className="rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/60 p-10 text-center font-mono text-sm text-ink-900/55">
                Carregando projetos…
              </div>
            ) : filteredAreas.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/60 p-10 text-center font-mono text-sm text-ink-900/55">
                Nenhuma área encontrada. Tente outro código ou termo.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredAreas.map((pillar) => {
                  const Icon = iconMap[pillar.icon];
                  const usedBy = projects.filter((p) => p.bncc.includes(pillar.area));
                  return (
                    <article
                      key={pillar.area}
                      className="relative flex flex-col overflow-hidden rounded-xl border-2 border-ink-900 bg-paper-50 shadow-[5px_5px_0_0_#4C1D95]"
                    >
                      <div className="flex items-start justify-between border-b-2 border-ink-900 bg-paper-100 px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 ${accentChip[pillar.accent]} text-ink-900 shadow-[2px_2px_0_0_#4C1D95]`}>
                            <Icon className="h-5 w-5" strokeWidth={2.25} />
                          </span>
                          <div>
                            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-900/55">
                              área · {pillar.code}
                            </p>
                            <h2 className="font-display text-[22px] font-bold leading-tight text-ink-900">
                              {pillar.area}
                            </h2>
                          </div>
                        </div>
                        <span className="rounded-md border-2 border-ink-900 bg-paper-50 px-2 py-1 font-mono text-[10px] font-bold text-ink-900">
                          {usedBy.length} {usedBy.length === 1 ? 'proj.' : 'projs.'}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-[17px] font-semibold leading-snug text-ink-900">
                          {pillar.title}
                        </h3>
                        <p className="mt-2 font-body text-[14px] leading-[1.55] text-ink-900/70">
                          {pillar.description}
                        </p>

                        <h4 className="mt-5 border-t border-dashed border-ink-900/15 pt-4 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900/70">
                          habilidades BNCC
                        </h4>
                        <ul className="mt-3 space-y-2.5 font-mono text-[11.5px]">
                          {pillar.competencies.map((comp) => {
                            const [code, ...rest] = comp.split(' — ');
                            const title = rest.join(' — ');
                            const full = bnccCompetencies[code];
                            return (
                              <li key={comp} className="flex items-start gap-2 text-ink-900/85">
                                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accentChip[pillar.accent]}`} />
                                <span className="leading-snug">
                                  <span className={`font-bold ${accentText[pillar.accent]}`}>{code}</span>
                                  {title && <> — {title}</>}
                                  {full && (
                                    <span className="mt-1 block font-body text-[12.5px] leading-[1.45] text-ink-900/60">
                                      {full.description}
                                    </span>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>

                        {usedBy.length > 0 && (
                          <>
                            <h4 className="mt-5 border-t border-dashed border-ink-900/15 pt-4 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900/70">
                              projetos que usam
                            </h4>
                            <ul className="mt-3 space-y-1.5">
                              {usedBy.map((p) => (
                                <li key={p.id}>
                                  <Link
                                    to={`/projetos/${p.id}`}
                                    className="group/link inline-flex items-center gap-1.5 font-mono text-[11.5px] text-ink-900/80 transition-colors hover:text-cyan-spark"
                                  >
                                    <span className={`h-1.5 w-1.5 rounded-full ${accentChip[p.illustration === 'lixeira' ? 'amber' : 'cyan']}`} />
                                    {p.title}
                                    <ArrowUpRight
                                      className="h-3 w-3 transition-transform group-hover/link:rotate-45"
                                      strokeWidth={2.5}
                                    />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <BnccFooter />
    </div>
  );
}

function BnccHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50">
            <Bot className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[20px] font-bold tracking-tight text-ink-900">
              Lúmina Tech
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
              BNCC · mapeamento
            </span>
          </div>
        </Link>

        <Link
          to="/projetos"
          className="group inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Ver projetos
        </Link>
      </nav>
    </header>
  );
}

function BnccFooter() {
  return (
    <footer className="border-t-2 border-ink-900/10 bg-gradient-to-r from-violet-deep to-ink-900 py-10 text-paper-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/55">
            Lúmina Tech · 2026
          </p>
          <p className="mt-1 font-display text-[15px] font-semibold">
            Precisa de ajuda com o plano de aula?{' '}
            <Link to="/" className="text-cyan-spark underline decoration-2 underline-offset-4 hover:text-cyan-deep">
              Voltar para a home
            </Link>
          </p>
        </div>
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 rounded-md border-2 border-paper-50/30 bg-transparent px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-paper-50 transition-all hover:border-paper-50 hover:bg-paper-50/[0.06]"
        >
          <ArrowUpRight className="h-3.5 w-3.5" /> Ver projetos
        </Link>
      </div>
    </footer>
  );
}
