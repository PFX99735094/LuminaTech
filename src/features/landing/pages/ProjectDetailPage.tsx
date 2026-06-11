import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Cpu,
  Lightbulb,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { projectDetails, hasProjectDetails } from '../data/projectDetails';
import { bnccCompetencies } from '../data/bnccAreas';
import type { Project, ProjectDetails } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { PinLegend, WiringDiagram } from '../components/wiring/WiringDiagram';
import { fetchProjectByIdPublic } from '../data/projectsRepo';
import { projects as localProjects } from '../data/projects';

export function ProjectDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<ProjectDetails | undefined>(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    let cancelled = false;
    async function load() {
      setLoading(true);
      // tenta buscar no Supabase e, se não achar, usa local
      const remote = await fetchProjectByIdPublic(id);
      if (cancelled) return;
      if (remote) {
        setProject(remote);
      } else {
        const local = localProjects.find((p) => p.id === id) ?? null;
        setProject(local);
      }
      setDetails(hasProjectDetails(id) ? projectDetails[id] : undefined);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper-50">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-ink-900/20 border-t-cyan-spark" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
            Carregando projeto…
          </span>
        </div>
      </div>
    );
  }

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
      <DetailHeader />

      <main>
        <section className="relative overflow-hidden border-b-2 border-ink-900/10 bg-paper-100">
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
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-10 h-80 w-80 rounded-full bg-cyan-spark/15 blur-[120px]" />

          <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-12 lg:px-10 lg:pb-16 lg:pt-16">
            <Link
              to="/projetos"
              className="group mb-6 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900/65 transition-colors hover:text-ink-900"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Catálogo de projetos
            </Link>

            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-900/70">
                  <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink-900 bg-amber-glow font-bold text-ink-900">01</span>
                  <span>projeto pronto</span>
                  <span className="hidden h-px w-12 bg-ink-900/20 sm:block" />
                </div>

                <h1 className="mt-5 font-display text-4xl font-black leading-[0.98] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[60px]">
                  {project.title}
                </h1>
                <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-900/55">
                  {project.subtitle}
                </p>
              </div>

                <dl className="grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-900/55 md:col-span-5">
                  <Stat label="Duração" value={project.duration} />
                  <Stat label="BNCC" value={project.bnccCode} small />
                </dl>
            </div>

            <p className="mt-8 max-w-3xl font-body text-[17px] leading-[1.55] text-ink-900/80">
              {details?.summary ?? project.description}
            </p>
          </div>
        </section>

        {details ? (
          <DetailsSection
            projectId={id}
            project={project}
            details={details}
          />
        ) : (
          <NotReadySection
            project={project}
            fallbackDescription={project.description}
            materials={project.materials}
          />
        )}
      </main>

      <DetailFooter />
    </div>
  );
}

function DetailsSection({
  projectId,
  project,
  details,
}: {
  projectId: string;
  project: Project;
  details: ProjectDetails;
}) {
  return (
    <>
      <section className="bg-paper-50 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
            <div className="md:col-span-7">
              <SectionHeader
                number="01"
                title="Esquema de ligação"
                hint="Conexões com pinos do Arduino"
              />
              <div className="mt-6 overflow-hidden rounded-xl border-2 border-ink-900 bg-paper-50 shadow-[5px_5px_0_0_#4C1D95]">
                <div className="flex items-center justify-between border-b-2 border-ink-900 bg-paper-100 px-4 py-2.5">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-900/70">
                    diagrama · {projectId}
                  </span>
                  <span className="rounded-md border-2 border-ink-900 bg-amber-glow px-2 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] text-ink-900">
                    {details.kind === 'arduino' ? 'Arduino' : 'Mecânica'}
                  </span>
                </div>
                <div className="aspect-[2/1] w-full bg-paper-50 p-3">
                  <WiringDiagram projectId={projectId} details={details} />
                </div>
                <div className="border-t-2 border-dashed border-ink-900/20 bg-paper-100 px-4 py-3">
                  <PinLegend />
                </div>
              </div>

              {details.warnings && details.warnings.length > 0 && (
                <div className="mt-5 rounded-xl border-2 border-rose-deep bg-rose-pulse/15 p-5">
                  <h4 className="inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-rose-deep">
                    <Lightbulb className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Atenção antes de montar
                  </h4>
                  <ul className="mt-3 space-y-1.5 font-body text-[14.5px] leading-[1.55] text-ink-900/80">
                    {details.warnings.map((w) => (
                      <li key={w} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-deep" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="md:col-span-5">
              <SectionHeader number="02" title="Componentes" hint="Lista de materiais" />
              <ul className="mt-6 space-y-2.5">
                {details.components.map((c, i) => (
                  <li
                    key={c.id}
                    className="flex items-center gap-3 rounded-lg border-2 border-ink-900 bg-paper-50 px-4 py-3"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink-900 bg-amber-glow font-mono text-[10.5px] font-bold text-ink-900">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-display text-[15.5px] font-semibold text-ink-900">
                        {c.name}
                      </p>
                      {c.description && (
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/55">
                          {c.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border-2 border-ink-900 bg-paper-100 p-5">
                <h4 className="inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-900/70">
                  <Wrench className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Tabela de conexões
                </h4>
                <div className="mt-3 overflow-hidden rounded-lg border-2 border-ink-900/15 bg-paper-50">
                  <table className="w-full font-mono text-[11px]">
                    <thead>
                      <tr className="border-b-2 border-ink-900/15 bg-paper-100 text-left text-[10px] uppercase tracking-[0.18em] text-ink-900/55">
                        <th className="px-3 py-2 font-bold">De</th>
                        <th className="px-3 py-2 font-bold">Para</th>
                        <th className="px-3 py-2 font-bold">Fio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.connections.map((c, i) => (
                        <tr key={i} className="border-b border-ink-900/10 last:border-0">
                          <td className="px-3 py-2 text-ink-900">{c.from}</td>
                          <td className="px-3 py-2 text-ink-900/80">{c.to}</td>
                          <td className="px-3 py-2 text-ink-900/55">{c.label ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <SectionHeader
            number="03"
            title="Código Arduino"
            hint="Copie ou baixe o arquivo .ino"
          />

          <div className="mt-6">
            <CodeBlock
              code={details.code}
              filename={details.inoFilename}
              language={details.codeLanguage ?? 'arduino'}
            />
          </div>

          {details.extensions && details.extensions.length > 0 && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-50 p-5">
              <span className="grid h-7 w-7 place-items-center rounded-md border-2 border-ink-900 bg-lime-spark">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-900/55">
                  para ir além
                </p>
                <ul className="mt-2 space-y-1.5 font-body text-[14.5px] leading-[1.55] text-ink-900/80">
                  {details.extensions.map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-deep" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-paper-50 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <SectionHeader
            number="04"
            title="Habilidades BNCC"
            hint={`${project.bncc.length} ${project.bncc.length === 1 ? 'área' : 'áreas'} · ${project.bnccCompetencies.length} ${project.bnccCompetencies.length === 1 ? 'código' : 'códigos'} de habilidade`}
          />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.bncc.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink-900 bg-cyan-spark/15 px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-900"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-deep" />
                {area}
              </span>
            ))}
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {project.bnccCompetencies.map((code) => {
              const comp = bnccCompetencies[code];
              return (
                <li
                  key={code}
                  className="flex flex-col gap-1.5 rounded-xl border-2 border-ink-900 bg-paper-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-md border-2 border-ink-900 bg-cyan-spark px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-900">
                      {code}
                    </span>
                    {comp && (
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-900/55">
                        {comp.area}
                      </span>
                    )}
                  </div>
                  <p className="font-display text-[15px] font-semibold leading-snug text-ink-900">
                    {comp?.title ?? 'Habilidade BNCC'}
                  </p>
                  {comp && (
                    <p className="font-body text-[13.5px] leading-[1.5] text-ink-900/70">
                      {comp.description}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <Link
              to="/bncc"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-900 underline decoration-2 underline-offset-4 transition-colors hover:text-cyan-spark"
            >
              Ver mapeamento completo da BNCC →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper-100 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-10">
          <SectionHeader
            number="05"
            title="Passo a passo em sala"
            hint="4 etapas para aplicar com a turma"
          />

          <ol className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {details.setupSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border-2 border-ink-900 bg-paper-50 p-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border-2 border-ink-900 bg-amber-glow font-display text-[16px] font-black text-ink-900">
                  {i + 1}
                </span>
                <p className="font-body text-[15px] leading-[1.55] text-ink-900/80">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function NotReadySection({
  project: _project,
  fallbackDescription,
  materials,
}: {
  project: Project;
  fallbackDescription: string;
  materials: string[];
}) {
  return (
    <section className="bg-paper-50 py-20">
      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink-900 bg-amber-glow px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-900">
          <BookOpen className="h-3 w-3" strokeWidth={2.5} />
          Em breve
        </span>
        <h2 className="mt-5 font-display text-3xl font-black text-ink-900 sm:text-4xl">
          O esquema e o código deste projeto entram no ar em breve.
        </h2>
        <p className="mt-4 font-body text-[16px] leading-[1.55] text-ink-900/70">
          {fallbackDescription}
        </p>

        <ul className="mx-auto mt-8 max-w-md space-y-2 text-left font-mono text-[12px] uppercase tracking-[0.16em] text-ink-900/75">
          {materials.map((m) => (
            <li
              key={m}
              className="flex items-center gap-2 rounded-md border border-ink-900/20 bg-paper-50 px-3 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-deep" />
              {m}
            </li>
          ))}
        </ul>

        <Link
          to="/projetos"
          className="mt-8 inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] hover:bg-cyan-spark hover:text-ink-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para o catálogo
        </Link>
      </div>
    </section>
  );
}

function SectionHeader({
  number,
  title,
  hint,
}: {
  number: string;
  title: string;
  hint: string;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-900/70">
        <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink-900 bg-amber-glow font-bold text-ink-900">
          {number}
        </span>
        <span>{title}</span>
        <span className="hidden h-px w-12 bg-ink-900/20 sm:block" />
      </div>
      <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/55">
        {hint}
      </p>
    </div>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="border-l-2 border-ink-900/15 pl-3">
      <dt className="text-[10px]">{label}</dt>
      <dd
        className={`mt-1 font-display font-bold text-ink-900 ${small ? 'text-[12.5px] leading-tight' : 'text-[15px]'}`}
      >
        {value}
      </dd>
    </div>
  );
}

function DetailHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50">
            <Cpu className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[20px] font-bold tracking-tight text-ink-900">
              Lúmina Tech
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
              projeto · detalhes
            </span>
          </div>
        </Link>

        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900 hover:bg-violet-deep hover:text-paper-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </nav>
    </header>
  );
}

function DetailFooter() {
  return (
    <footer className="border-t-2 border-ink-900/10 bg-gradient-to-r from-violet-deep to-ink-900 py-10 text-paper-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/55">
            Lúmina Tech · 2026
          </p>
          <p className="mt-1 font-display text-[15px] font-semibold">
            Precisa de ajuda com a aula?{' '}
            <a
              href="mailto:ajuda@atelierobo.com.br"
              className="text-cyan-spark underline decoration-2 underline-offset-4 hover:text-cyan-deep"
            >
              Fale com um educador
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 rounded-md border-2 border-paper-50/30 bg-transparent px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-paper-50 hover:border-paper-50 hover:bg-paper-50/[0.06]"
          >
            <ArrowUpRight className="h-3.5 w-3.5" /> Ver mais projetos
          </Link>
        </div>
      </div>
    </footer>
  );
}

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper-50 px-6 text-center">
      <div>
        <h1 className="font-display text-5xl font-black text-ink-900">404</h1>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-900/65">
          Projeto não encontrado
        </p>
        <Link
          to="/projetos"
          className="mt-6 inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao catálogo
        </Link>
      </div>
    </div>
  );
}
