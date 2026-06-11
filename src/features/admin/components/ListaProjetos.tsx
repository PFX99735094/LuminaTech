import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects as localProjects } from '../../landing/data/projects';

interface AdminProject {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  bnccCount: number;
  materialsCount: number;
}

export function ListaProjetos() {
  const [search, setSearch] = useState('');
  

  const allProjects: AdminProject[] = useMemo(() => {
    return localProjects.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle ?? '',
      duration: p.duration ?? '—',
      bnccCount: (p.bncc ?? []).length,
      materialsCount: (p.materials ?? []).length,
    }));
  }, []);

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [allProjects, search]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Relação de Projetos</h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
            {allProjects.length} projetos do catálogo (somente leitura)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2" />
      </div>

      <label className="mb-5 flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2 focus-within:shadow-[2px_2px_0_0_#4C1D95] sm:w-80">
        <Search className="h-4 w-4 shrink-0 text-ink-900/55" strokeWidth={2.25} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por título, subtítulo ou ID…"
          className="w-full bg-transparent font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:outline-none"
        />
      </label>

      {/* Ações de exclusão/restore removidas (somente leitura) */}

      <div className="overflow-x-auto rounded-xl border-2 border-ink-900 bg-paper-50 shadow-[4px_4px_0_0_#4C1D95]">
        <table className="w-full font-mono text-[12px]">
          <thead>
            <tr className="border-b-2 border-ink-900 bg-paper-100 text-left text-[10px] uppercase tracking-[0.18em] text-ink-900/55">
              <th className="px-4 py-3 font-bold">Título</th>
              <th className="px-4 py-3 font-bold">Duração</th>
              <th className="px-4 py-3 font-bold">Áreas BNCC</th>
              <th className="px-4 py-3 font-bold">Materiais</th>
              <th className="px-4 py-3 font-bold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-900/45">
                  Nenhum projeto encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((project) => (
                <tr
                  key={project.id}
                  className={`border-b border-ink-900/10 last:border-0 hover:bg-paper-100/50`}
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className={`font-display text-[14px] font-semibold text-ink-900`}>
                        {project.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-900/55">
                        {project.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-900/75">{project.duration}</td>
                  <td className="px-4 py-3 text-ink-900/75">{project.bnccCount}</td>
                  <td className="px-4 py-3 text-ink-900/75">{project.materialsCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/projetos/${project.id}`}
                        className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink-900 text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50"
                        title="Ver no site"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/45">
        Somente leitura — edição, exclusão e cadastro desativados.
      </p>
    </div>
  );
}
