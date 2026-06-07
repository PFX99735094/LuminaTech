import { useMemo, useState, useCallback } from 'react';
import { AlertTriangle, ArrowUpRight, Search, Trash2, Undo2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../landing/data/projects';
import type { Difficulty } from '../../landing/types';

const DIFFICULTIES: ('Todas' | Difficulty)[] = ['Todas', 'Iniciante', 'Intermediário', 'Avançado'];

interface AdminProject {
  id: string;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  duration: string;
  bnccCount: number;
  materialsCount: number;
  source: 'original' | 'admin';
  hidden?: boolean;
}

const HIDDEN_KEY = 'hidden_project_ids';

function getHiddenIds(): string[] {
  try {
    const raw = localStorage.getItem(HIDDEN_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setHiddenIds(ids: string[]) {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(ids));
}

export function ListaProjetos() {
  const [difficulty, setDifficulty] = useState<'Todas' | Difficulty>('Todas');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const allProjects: AdminProject[] = useMemo(() => {
    const hiddenIds = getHiddenIds();

    const originals = projects
      .filter((p) => !hiddenIds.includes(p.id))
      .map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        difficulty: p.difficulty,
        duration: p.duration,
        bnccCount: p.bncc.length,
        materialsCount: p.materials.length,
        source: 'original' as const,
        hidden: false,
      }));

    let adminStored: AdminProject[] = [];
    try {
      const raw = localStorage.getItem('admin_projects');
      if (raw) {
        const parsed = JSON.parse(raw);
        adminStored = parsed
          .filter((p: any) => !hiddenIds.includes(p.id))
          .map((p: any) => ({
            id: p.id,
            title: p.title,
            subtitle: p.subtitle,
            difficulty: p.difficulty,
            duration: p.duration,
            bnccCount: p.bncc?.length ?? 0,
            materialsCount: p.materials?.length ?? 0,
            source: 'admin' as const,
            hidden: false,
          }));
      }
    } catch {}

    const hiddenProjects: AdminProject[] = hiddenIds.map((id) => ({
      id,
      title: `"${id}" (excluído)`,
      subtitle: '',
      difficulty: 'Iniciante' as Difficulty,
      duration: '—',
      bnccCount: 0,
      materialsCount: 0,
      source: 'original' as const,
      hidden: true,
    }));

    return [...adminStored, ...originals, ...hiddenProjects];
  }, []);

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (difficulty !== 'Todas' && p.difficulty !== difficulty && !p.hidden) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [allProjects, difficulty, search]);

  const handleDelete = useCallback((id: string) => {
    setConfirmDelete(id);
  }, []);

  const confirmDeletion = useCallback((id: string) => {
    const hiddenIds = getHiddenIds();

    const raw = localStorage.getItem('admin_projects');
    const adminList: any[] = raw ? JSON.parse(raw) : [];
    const wasAdmin = adminList.some((p: any) => p.id === id);

    if (wasAdmin) {
      const updated = adminList.filter((p: any) => p.id !== id);
      localStorage.setItem('admin_projects', JSON.stringify(updated));
    }

    if (!hiddenIds.includes(id)) {
      hiddenIds.push(id);
      setHiddenIds(hiddenIds);
    }

    setConfirmDelete(null);
  }, []);

  const cancelDelete = useCallback(() => {
    setConfirmDelete(null);
  }, []);

  const handleRestore = useCallback((id: string) => {
    const hiddenIds = getHiddenIds().filter((hid) => hid !== id);
    setHiddenIds(hiddenIds);
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Relação de Projetos</h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
            {allProjects.filter((p) => !p.hidden).length} ativos · {allProjects.filter((p) => p.hidden).length} excluídos
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-md border-2 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-all ${
                difficulty === d
                  ? 'border-ink-900 bg-violet-deep text-paper-50 shadow-[2px_2px_0_0_#4C1D95]'
                  : 'border-ink-900/20 bg-paper-50 text-ink-900/60 hover:border-ink-900'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
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

      {confirmDelete && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border-2 border-rose-deep bg-rose-pulse/15 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-deep" strokeWidth={2.25} />
          <div className="flex-1">
            <p className="font-display text-[15px] font-semibold text-ink-900">
              Excluir &ldquo;{confirmDelete}&rdquo;?
            </p>
            <p className="mt-1 font-mono text-[11px] text-ink-900/60">
              O projeto será ocultado da lista. É possível restaurá-lo depois.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => confirmDeletion(confirmDelete)}
                className="inline-flex items-center gap-1.5 rounded-md border-2 border-rose-deep bg-rose-pulse px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-900 transition-all hover:bg-rose-deep hover:text-paper-50"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                Confirmar exclusão
              </button>
              <button
                onClick={cancelDelete}
                className="rounded-md border-2 border-ink-900/30 bg-paper-50 px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-900/70 transition-all hover:border-ink-900 hover:text-ink-900"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border-2 border-ink-900 bg-paper-50 shadow-[4px_4px_0_0_#4C1D95]">
        <table className="w-full font-mono text-[12px]">
          <thead>
            <tr className="border-b-2 border-ink-900 bg-paper-100 text-left text-[10px] uppercase tracking-[0.18em] text-ink-900/55">
              <th className="px-4 py-3 font-bold">Título</th>
              <th className="px-4 py-3 font-bold">Dificuldade</th>
              <th className="px-4 py-3 font-bold">Duração</th>
              <th className="px-4 py-3 font-bold">Áreas BNCC</th>
              <th className="px-4 py-3 font-bold">Materiais</th>
              <th className="px-4 py-3 font-bold">Fonte</th>
              <th className="px-4 py-3 font-bold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-900/45">
                  Nenhum projeto encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((project) => (
                <tr
                  key={project.id}
                  className={`border-b border-ink-900/10 last:border-0 ${
                    project.hidden ? 'bg-ink-900/[0.03] opacity-60' : 'hover:bg-paper-100/50'
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className={`font-display text-[14px] font-semibold ${project.hidden ? 'italic text-ink-900/50' : 'text-ink-900'}`}>
                        {project.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-900/55">
                        {project.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {project.hidden ? (
                      <span className="text-ink-900/40">—</span>
                    ) : (
                      <span
                        className={`inline-block rounded-md border-2 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em] ${
                          project.difficulty === 'Iniciante'
                            ? 'border-lime-deep bg-lime-spark/20 text-lime-deep'
                            : project.difficulty === 'Intermediário'
                              ? 'border-amber-deep bg-amber-glow/20 text-amber-deep'
                              : 'border-rose-deep bg-rose-pulse/20 text-rose-deep'
                        }`}
                      >
                        {project.difficulty}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-900/75">{project.hidden ? '—' : project.duration}</td>
                  <td className="px-4 py-3 text-ink-900/75">{project.hidden ? '—' : project.bnccCount}</td>
                  <td className="px-4 py-3 text-ink-900/75">{project.hidden ? '—' : project.materialsCount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-md border-2 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${
                        project.hidden
                          ? 'border-ink-900/20 bg-paper-50 text-ink-900/40'
                          : project.source === 'admin'
                            ? 'border-cyan-deep bg-cyan-spark/20 text-cyan-deep'
                            : 'border-violet-deep bg-violet-spark/20 text-violet-deep'
                      }`}
                    >
                      {project.hidden ? 'Excluído' : project.source === 'admin' ? 'Admin' : 'Original'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {project.hidden ? (
                        <button
                          onClick={() => handleRestore(project.id)}
                          className="inline-flex items-center gap-1 rounded-md border-2 border-ink-900 px-2.5 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-900 transition-all hover:bg-lime-spark hover:text-ink-900"
                        >
                          <Undo2 className="h-3 w-3" strokeWidth={2.5} />
                          Restaurar
                        </button>
                      ) : (
                        <>
                          <Link
                            to={`/projetos/${project.id}`}
                            className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink-900 text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="grid h-8 w-8 place-items-center rounded-md border-2 border-ink-900 text-ink-900 transition-all hover:bg-rose-pulse hover:text-ink-900"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/45">
        Projetos excluídos ficam ocultos e podem ser restaurados a qualquer momento.
      </p>
    </div>
  );
}
