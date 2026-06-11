import { useState } from 'react';
import type { Project } from '../types';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const accentMap: Record<string, { spark: string; deep: string }> = {
  cyan: { spark: '#22D3EE', deep: '#0E7490' },
  violet: { spark: '#A78BFA', deep: '#6D28D9' },
  amber: { spark: '#FBBF24', deep: '#B45309' },
  lime: { spark: '#A3E635', deep: '#4D7C0F' },
  rose: { spark: '#FB7185', deep: '#BE123C' },
  teal: { spark: '#2DD4BF', deep: '#0F766E' },
  orange: { spark: '#FB923C', deep: '#C2410C' },
};

const difficultyClass: Record<string, string> = {
  Iniciante: 'bg-lime-spark/15 border-lime-spark/30 text-lime-spark',
  Intermediário: 'bg-amber-glow/15 border-amber-glow/30 text-amber-glow',
  Avançado: 'bg-rose-pulse/15 border-rose-pulse/30 text-rose-pulse',
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const accent = project.accent ? accentMap[project.accent] : accentMap.cyan;
  const diffClass = project.difficulty ? difficultyClass[project.difficulty] : null;
  const itemNumber = String(index + 1).padStart(2, '0');

  function placeholderFor(title: string): string {
    const t = title.toLowerCase();
    if (t.includes('lixeira')) return 'https://source.unsplash.com/800x640/?arduino,ultrasonic,sensor';
    if (t.includes('carrinho') || t.includes('robô') || t.includes('robo')) return 'https://source.unsplash.com/800x640/?arduino,robot,car';
    if (t.includes('umidade') || t.includes('estação') || t.includes('estacao')) return 'https://source.unsplash.com/800x640/?arduino,sensor,weather';
    if (t.includes('semáforo') || t.includes('semaforo')) return 'https://source.unsplash.com/800x640/?traffic,lights,arduino';
    if (t.includes('jardim')) return 'https://source.unsplash.com/800x640/?garden,automation,arduino';
    if (t.includes('piano')) return 'https://source.unsplash.com/800x640/?electronics,buzzer,keyboard';
    return 'https://source.unsplash.com/800x640/?arduino,robotics';
  }

  return (
    <article
      className="group relative overflow-hidden border-2 border-ink-900/20 bg-paper-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_rgba(34,211,238,0.15)] motion-safe:animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-2 border-b border-ink-900/10 bg-paper-100/60 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-pulse" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-glow" />
        <span className="h-1.5 w-1.5 rounded-full bg-lime-spark" />
        <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.22em] text-ink-700/60">
          projeto {itemNumber}
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-ink-700/60">
          v1.0
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[21px] font-bold leading-tight tracking-tight text-ink-900">
              {project.title}
            </h3>
            <p className="mt-0.5 line-clamp-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700/60">
              {project.subtitle}
            </p>
          </div>
          {diffClass && (
            <span className={`shrink-0 rounded-sm border px-2 py-1 font-mono text-[7.5px] font-bold uppercase tracking-[0.18em] ${diffClass}`}>
              {project.difficulty}
            </span>
          )}
        </div>

        <div className="relative mt-3 aspect-[5/3] overflow-hidden rounded-sm border border-ink-900/10 bg-paper-100">
          <img
            src={imgError || !project.cardImageUrl ? placeholderFor(project.title) : project.cardImageUrl}
            alt={project.cardImageAlt || project.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${accent.spark}15 0%, transparent 45%, ${accent.deep}25 100%)`,
            }}
          />
        </div>

        <p className="mt-3 line-clamp-2 font-body text-[13px] leading-snug text-ink-700/70">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {project.materials.slice(0, 3).map((mat) => (
            <span
              key={mat}
              className="rounded-sm bg-ink-900/[0.04] px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.16em] text-ink-700/60"
            >
              {mat}
            </span>
          ))}
          {project.materials.length > 3 && (
            <span className="rounded-sm bg-ink-900/[0.04] px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-[0.16em] text-ink-700/40">
              +{project.materials.length - 3}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink-900/10 pt-3">
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-ink-700/50">
            <Clock className="h-3 w-3" strokeWidth={2.5} />
            {project.duration}
          </span>
          <Link
            to={`/projetos/${project.id}`}
            className="inline-flex items-center gap-1.5 rounded-sm bg-violet-deep px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-paper-50 hover:bg-cyan-spark hover:text-ink-900"
          >
            Ver roteiro
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-spark to-violet-spark transition-all duration-500 group-hover:w-full"
      />
    </article>
  );
}


