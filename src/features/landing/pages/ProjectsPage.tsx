import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';
import type { Difficulty } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { accentMap } from '../components/ProjectCard';

const DIFFICULTIES: ('Todos' | Difficulty)[] = [
  'Todos',
  'Iniciante',
  'Intermediário',
  'Avançado',
];

export function ProjectsPage() {
  const [difficulty, setDifficulty] = useState<'Todos' | Difficulty>('Todos');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchDifficulty = difficulty === 'Todos' || project.difficulty === difficulty;
      const q = query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.bncc.some((area) => area.toLowerCase().includes(q)) ||
        project.materials.some((m) => m.toLowerCase().includes(q));
      return matchDifficulty && matchQuery;
    });
  }, [difficulty, query]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      iniciante: projects.filter((p) => p.difficulty === 'Iniciante').length,
      intermediario: projects.filter((p) => p.difficulty === 'Intermediário').length,
      avancado: projects.filter((p) => p.difficulty === 'Avançado').length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
      <PageHeader />

      <main>
        <PageHero total={stats.total} />

        <section className="relative bg-paper-100 pb-24 pt-2 lg:pb-32">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-3 border-b-2 border-ink-900/15 pb-5 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="group flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 focus-within:shadow-[3px_3px_0_0_#4C1D95]">
                  <Search className="h-4 w-4 text-ink-900/55" strokeWidth={2.25} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por título, BNCC ou material…"
                    className="w-full bg-transparent font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-900/55 hover:text-ink-900"
                    >
                      limpar
                    </button>
                  )}
                </label>
              </div>

              <div className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-900/55">
                    <Filter className="h-3 w-3" strokeWidth={2.5} />
                    Dificuldade
                  </span>
                  {DIFFICULTIES.map((d) => {
                    const active = difficulty === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`rounded-md border-2 px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] transition-all ${
                          active
                            ? 'border-ink-900 bg-violet-deep text-paper-50 shadow-[2px_2px_0_0_#22D3EE]'
                            : 'border-ink-900/20 bg-paper-50 text-ink-900/70 hover:border-ink-900 hover:text-ink-900'
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/55">
              <p>
                Exibindo{' '}
                <span className="font-bold text-ink-900">{filtered.length}</span> de{' '}
                <span className="font-bold text-ink-900">{stats.total}</span> projetos
              </p>
              <p className="inline-flex items-center gap-1.5">
                <SlidersHorizontal className="h-3 w-3" strokeWidth={2.5} />
                clique em um card para abrir o roteiro completo
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-16 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ink-900/20 bg-paper-50 px-6 py-16 text-center">
                <p className="font-display text-2xl font-bold text-ink-900">
                  Nenhum projeto encontrado
                </p>
                <p className="font-body text-[15px] text-ink-900/65">
                  Tente outro termo ou remova o filtro de dificuldade.
                </p>
                <button
                  onClick={() => {
                    setDifficulty('Todos');
                    setQuery('');
                  }}
                  className="mt-2 inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-cyan-spark px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                {filtered.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}

            <div className="mt-16 flex flex-col items-center gap-3 rounded-xl border-2 border-ink-900 bg-cyan-spark/20 px-6 py-10 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-paper-50 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/70">
                <Sparkles className="h-3 w-3 text-cyan-spark" strokeWidth={2.5} />
                novos projetos quinzenalmente
              </span>
              <h3 className="font-display text-2xl font-black text-ink-900 sm:text-3xl">
                Quer um projeto sob medida para a sua turma?
              </h3>
              <p className="max-w-md font-body text-[15px] text-ink-900/75">
                Professores do plano Escola podem solicitar até 2 projetos
                customizados por semestre, alinhados com a sua BNCC local.
              </p>
              <Link
                to="/cadastro"
                className="mt-2 inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[1px_1px_0_0_#4C1D95]"
              >
                Conhecer plano Escola
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50">
            <Sparkles className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[20px] font-bold tracking-tight text-ink-900">
              Lúmina Tech
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
              catálogo de projetos
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Voltar
        </Link>
      </nav>
    </header>
  );
}

function PageHero({ total }: { total: number }) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink-900/10 bg-paper-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(20,16,10,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,16,10,0.10) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 35%, #000 50%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-cyan-spark/30 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lime-spark/15 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-14 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-900/70">
          <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink-900 bg-amber-glow font-bold text-ink-900">
            01
          </span>
          <span>catálogo completo</span>
          <span className="hidden h-px w-12 bg-ink-900/20 sm:block" />
        </div>

        <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[0.98] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[64px]">
          {total} projetos prontos
          <br />
          para a sua{' '}
          <span className="relative inline-block">
            <span className="font-display italic text-cyan-spark">próxima aula</span>
            <span aria-hidden className="absolute -bottom-1 left-0 h-1 w-full bg-cyan-spark" />
          </span>
        </h1>

        <p className="mt-5 max-w-2xl font-body text-lg leading-[1.55] text-ink-900/75">
          Filtre por dificuldade, busque por componente ou área BNCC e baixe
          o roteiro completo com lista de materiais, código-fonte comentado e
          mapa de competências.
        </p>

        <ul className="mt-8 flex flex-wrap items-center gap-2">
          {(['amber', 'lime', 'cyan', 'rose', 'violet', 'teal', 'orange', 'fuchsia'] as const).map(
            (key) => {
              const accent = accentMap[key];
              return (
                <li
                  key={key}
                  className={`inline-flex items-center gap-1.5 rounded-md border-2 border-ink-900 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${accent.deep}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-900" />
                  {key}
                </li>
              );
            },
          )}
        </ul>
      </div>
    </section>
  );
}

function PageFooter() {
  return (
    <footer className="border-t-2 border-ink-900/10 bg-gradient-to-r from-violet-deep to-ink-900 py-8 text-paper-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-6 sm:flex-row sm:items-center lg:px-10">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/55">
          © 2026 Lúmina Tech · feito no Brasil
        </p>
        <Link
          to="/"
          className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/75 hover:text-cyan-spark"
        >
          ← voltar para a página inicial
        </Link>
      </div>
    </footer>
  );
}
