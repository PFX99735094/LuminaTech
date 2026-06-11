import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Box, Grid3x3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { fetchAllProjectsPublic } from '../data/projectsRepo';
import { projects as localProjects } from '../data/projects';

const FEATURED_COUNT = 4;

export function ProjectShowcase() {
  const [remote, setRemote] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchAllProjectsPublic();
        if (!cancelled) setRemote(data);
      } catch {
        if (!cancelled) setRemote(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const all: Project[] = useMemo(() => {
    if (Array.isArray(remote) && remote.length > 0) return remote;
    return localProjects;
  }, [remote]);

  const featured = useMemo(() => all.slice(0, FEATURED_COUNT), [all]);

  return (
    <section id="projetos" className="relative overflow-hidden bg-paper-100 py-20 lg:py-28">
      <DraftingGrid />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 motion-safe:animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="md:col-span-7">
            <SectionLabel number="01" text="catálogo de projetos" />
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-[-0.03em] text-ink-900 sm:text-5xl lg:text-[58px]">
              Quatro projetos prontos
              <br />
              para a aula de{' '}
              <span className="relative">
                <span className="font-display italic text-cyan-spark">amanhã</span>
                <span aria-hidden className="absolute -bottom-2 left-0 h-[2px] w-full bg-cyan-spark/60" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }} />
              </span>
              .
            </h2>
          </div>
          <div className="flex items-end md:col-span-5 md:justify-end">
            <p className="max-w-sm font-body text-[15px] leading-[1.6] text-ink-700/80">
              Cada projeto vem com lista de materiais, código-fonte comentado,
              roteiro de aula e mapa de competências BNCC.
            </p>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-16 motion-safe:animate-fade-up" style={{ animationDelay: '180ms' }}>
          <div className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-700/50">
            <Grid3x3 className="h-3 w-3" strokeWidth={2.5} />
            <span>projetos em destaque</span>
            <span className="h-px flex-1 bg-ink-900/10" />
            <span className="hidden sm:block">{all.length} no total</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center rounded-sm border-2 border-dashed border-ink-900/15 bg-paper-50 px-6 py-16 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-700/50">Carregando projetos…</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {featured.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2.5 rounded-sm bg-violet-deep px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper-50 shadow-[4px_4px_0_0_#3B0F8C] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[4px_4px_0_0_#0E7490]"
            >
              Ver todos os {all.length} projetos
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>

            <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-700/50">
              <span className="h-px w-6 bg-ink-700/30" />
              <Box className="h-3 w-3" strokeWidth={2.5} />
              novos projetos toda semana
              <span className="h-px w-6 bg-ink-700/30" />
              <ArrowUpRight className="h-3 w-3 text-cyan-spark" strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DraftingGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.2]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(158,172,194,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(158,172,194,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 40%, transparent 100%)',
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
