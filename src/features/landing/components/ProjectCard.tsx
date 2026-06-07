import type { AccentKey, BnccArea, Project } from '../types';
import { ProjectIllustration } from './illustrations/ProjectIllustration';
import { ArrowUpRight, Clock, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export const accentMap: Record<
  AccentKey,
  { bg: string; text: string; ring: string; chip: string; deep: string; soft: string }
> = {
  amber: {
    bg: 'bg-amber-glow/40',
    text: 'text-amber-deep',
    ring: 'ring-amber-deep/30',
    chip: 'bg-amber-deep text-paper-50',
    deep: 'bg-amber-deep text-paper-50',
    soft: 'bg-amber-glow/15',
  },
  lime: {
    bg: 'bg-lime-spark/30',
    text: 'text-lime-deep',
    ring: 'ring-lime-deep/30',
    chip: 'bg-lime-spark text-ink-900',
    deep: 'bg-lime-spark text-ink-900',
    soft: 'bg-lime-spark/15',
  },
  cyan: {
    bg: 'bg-cyan-spark/30',
    text: 'text-cyan-deep',
    ring: 'ring-cyan-deep/30',
    chip: 'bg-cyan-spark text-ink-900',
    deep: 'bg-cyan-spark text-ink-900',
    soft: 'bg-cyan-spark/15',
  },
  rose: {
    bg: 'bg-rose-pulse/25',
    text: 'text-rose-deep',
    ring: 'ring-rose-deep/30',
    chip: 'bg-rose-pulse text-paper-50',
    deep: 'bg-rose-pulse text-paper-50',
    soft: 'bg-rose-pulse/15',
  },
  violet: {
    bg: 'bg-violet-spark/40',
    text: 'text-violet-deep',
    ring: 'ring-violet-deep/30',
    chip: 'bg-violet-deep text-paper-50',
    deep: 'bg-violet-deep text-paper-50',
    soft: 'bg-violet-spark/15',
  },
  teal: {
    bg: 'bg-teal-spark/35',
    text: 'text-teal-deep',
    ring: 'ring-teal-deep/30',
    chip: 'bg-teal-spark text-ink-900',
    deep: 'bg-teal-spark text-ink-900',
    soft: 'bg-teal-spark/15',
  },
  orange: {
    bg: 'bg-orange-spark/35',
    text: 'text-orange-deep',
    ring: 'ring-orange-deep/30',
    chip: 'bg-orange-spark text-ink-900',
    deep: 'bg-orange-spark text-ink-900',
    soft: 'bg-orange-spark/15',
  },
  fuchsia: {
    bg: 'bg-fuchsia-spark/30',
    text: 'text-fuchsia-deep',
    ring: 'ring-fuchsia-deep/30',
    chip: 'bg-fuchsia-deep text-paper-50',
    deep: 'bg-fuchsia-deep text-paper-50',
    soft: 'bg-fuchsia-spark/15',
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'default' | 'compact';
}

export function ProjectCard({ project, index, variant = 'default' }: ProjectCardProps) {
  const accent = accentMap[project.accent];
  const itemNumber = String(index + 1).padStart(2, '0');
  const isCompact = variant === 'compact';

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-ink-900 bg-paper-50 shadow-[5px_5px_0_0_#4C1D95] transition-all duration-300 hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[7px_7px_0_0_#4C1D95]">
      <div className={`relative aspect-[5/4] overflow-hidden border-b-2 border-ink-900 ${accent.bg}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.4),_transparent_50%)]" />
        <ProjectIllustration name={project.illustration} />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border-2 border-ink-900 bg-paper-50 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-900">
          <span className={`h-1.5 w-1.5 rounded-full ${accent.chip}`} />
          {itemNumber}
        </div>

        <div className="absolute right-3 top-3 rounded-md border-2 border-ink-900 bg-paper-50 px-2 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-ink-900">
          {project.bnccCode.split(' · ')[0]}
        </div>

        <span className={`absolute bottom-3 right-3 rounded-md ${accent.deep} px-2 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em]`}>
          {project.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[22px] font-bold leading-tight tracking-tight text-ink-900">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-900/55">
          {project.subtitle}
        </p>
        <p className={`mt-3 font-body text-[15px] leading-[1.55] text-ink-900/75 ${isCompact ? 'line-clamp-2' : ''}`}>
          {project.description}
        </p>

        <dl className="mt-5 space-y-2 border-t border-dashed border-ink-900/15 pt-4 font-mono text-[10.5px]">
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-900/55" strokeWidth={2} />
            <div>
              <dt className="sr-only">Duração</dt>
              <dd className="uppercase tracking-[0.14em] text-ink-900/75">{project.duration}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-900/55" strokeWidth={2} />
            <div>
              <dt className="sr-only">Materiais</dt>
              <dd className="uppercase tracking-[0.14em] text-ink-900/70">
                {project.materials.slice(0, 2).join(' · ')}
                {project.materials.length > 2 && ` +${project.materials.length - 2}`}
              </dd>
            </div>
          </div>
          {!isCompact && (
            <div className="flex flex-wrap gap-1 pt-1">
              {project.bncc.map((area: BnccArea) => (
                <span
                  key={area}
                  className={`rounded-sm border border-ink-900/15 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-900/70 ${accent.soft}`}
                >
                  {area}
                </span>
              ))}
            </div>
          )}
        </dl>

        <Link
          to={`/projetos/${project.id}`}
          className="mt-5 inline-flex items-center justify-between gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all group-hover:bg-violet-deep group-hover:text-paper-50"
        >
          Ver código
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </article>
  );
}
