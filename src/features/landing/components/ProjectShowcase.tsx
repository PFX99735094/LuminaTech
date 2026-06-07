import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';

const difficultyOrder: Record<Project['difficulty'], number> = {
  Iniciante: 1,
  Intermediário: 2,
  Avançado: 3,
};

const FEATURED_COUNT = 4;

export function ProjectShowcase() {
  const featured = [...projects]
    .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
    .slice(0, FEATURED_COUNT);

  return (
    <section id="projetos" className="relative bg-paper-100 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel number="01" text="vitrine de projetos" />
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[58px]">
              Quatro projetos prontos
              <br />
              para a aula de{' '}
              <span className="relative inline-block">
                <span className="font-display italic text-cyan-spark">amanhã</span>
                <span aria-hidden className="absolute -bottom-1 left-0 h-1 w-full bg-cyan-spark" />
              </span>
              .
            </h2>
          </div>
          <p className="font-body text-lg leading-[1.55] text-ink-900/70 md:col-span-5 md:max-w-md">
            Cada projeto vem com lista de materiais, código-fonte comentado,
            roteiro de aula e mapa de competências BNCC. Você só precisa
            decidir por onde começar.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:mt-14">
          <Link
            to="/projetos"
            className="group inline-flex items-center gap-3 rounded-md border-2 border-ink-900 bg-violet-deep px-6 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[4px_4px_0_0_#4C1D95] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[2px_2px_0_0_#4C1D95]"
          >
            Ver todos os {projects.length} projetos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>

          <p className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-900/55">
            <span className="h-px w-8 bg-ink-900/20" />
            <span>novos projetos toda semana</span>
            <span className="h-px w-8 bg-ink-900/20" />
            <ArrowUpRight className="h-3.5 w-3.5 text-cyan-spark" strokeWidth={2.5} />
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ number, text }: { number: string; text: string }) {
  return (
    <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-900/70">
      <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink-900 bg-amber-glow font-bold text-ink-900">
        {number}
      </span>
      <span>{text}</span>
      <span className="hidden h-px w-12 bg-ink-900/20 sm:block" />
    </div>
  );
}
