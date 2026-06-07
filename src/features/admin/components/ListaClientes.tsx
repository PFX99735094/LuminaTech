import { useEffect, useMemo, useState } from 'react';
import { Database, Mail, Phone, Building2, Search, User } from 'lucide-react';
import type { Client } from '../types';

const planStyles: Record<string, string> = {
  gratis: 'bg-paper-50 text-ink-900 border-ink-900/30',
  professor: 'bg-cyan-spark/20 text-cyan-deep border-cyan-deep/30',
  escola: 'bg-violet-spark/20 text-violet-deep border-violet-deep/30',
};

export function ListaClientes() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchClients() {
      setLoading(true);
      setError(null);

      try {
        const { supabase } = await import('../../../lib/supabaseClient');

        const { data, error: queryError } = await supabase
          .rpc('get_all_profiles');

        if (cancelled) return;

        if (queryError) {
          setError(queryError.message);
          return;
        }

        const mapped: Client[] = (data ?? []).map((row: Record<string, unknown>) => ({
          id: String(row.id ?? ''),
          name: String(row.name ?? 'Sem nome'),
          email: String(row.email ?? '—'),
          phone: row.phone ? String(row.phone) : undefined,
          school: row.school ? String(row.school) : undefined,
          registeredAt: String(row.created_at ?? new Date().toISOString()),
          plan: (row.plan as Client['plan']) ?? 'gratis',
        }));

        setClients(mapped);
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error
            ? err.message
            : 'Erro ao carregar clientes.',
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchClients();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone ?? '').includes(q),
    );
  }, [search, clients]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Clientes Cadastrados</h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
            {loading ? 'Carregando…' : `${clients.length} ${clients.length === 1 ? 'cliente' : 'clientes'}`}
          </p>
        </div>
        <label className="flex w-full items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2 focus-within:shadow-[2px_2px_0_0_#4C1D95] sm:w-72">
          <Search className="h-4 w-4 shrink-0 text-ink-900/55" strokeWidth={2.25} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail…"
            className="w-full bg-transparent font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:outline-none"
          />
        </label>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink-900 bg-paper-50 py-12 shadow-[4px_4px_0_0_#4C1D95]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-violet-deep border-t-transparent" />
          <span className="font-mono text-[12px] text-ink-900/55">Buscando clientes…</span>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-xl border-2 border-dashed border-rose-pulse/40 bg-rose-pulse/10 p-8 shadow-[4px_4px_0_0_#4C1D95]">
          <div className="flex flex-col items-center gap-3 text-center">
            <Database className="h-8 w-8 text-rose-deep" strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-[17px] font-bold text-rose-deep">
                Supabase não configurado
              </h3>
              <p className="mt-1 max-w-md font-mono text-[11px] text-ink-900/70">
                Configure as variáveis <code className="rounded bg-ink-900/10 px-1.5 py-0.5 font-mono text-[11px]">VITE_SUPABASE_URL</code> e{' '}
                <code className="rounded bg-ink-900/10 px-1.5 py-0.5 font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code> no arquivo{' '}
                <code className="rounded bg-ink-900/10 px-1.5 py-0.5 font-mono text-[11px]">.env</code> para exibir os clientes cadastrados.
              </p>
              <p className="mt-2 font-mono text-[10px] text-rose-deep/60">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto rounded-xl border-2 border-ink-900 bg-paper-50 shadow-[4px_4px_0_0_#4C1D95]">
            <table className="w-full font-mono text-[12px]">
              <thead>
                <tr className="border-b-2 border-ink-900 bg-paper-100 text-left text-[10px] uppercase tracking-[0.18em] text-ink-900/55">
                  <th className="px-4 py-3 font-bold">Nome</th>
                  <th className="px-4 py-3 font-bold">E-mail</th>
                  <th className="px-4 py-3 font-bold">Telefone</th>
                  <th className="px-4 py-3 font-bold">Escola</th>
                  <th className="px-4 py-3 font-bold">Plano</th>
                  <th className="px-4 py-3 font-bold">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-ink-900/45">
                      {search
                        ? 'Nenhum cliente encontrado para esta busca.'
                        : 'Nenhum cliente cadastrado ainda.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((client) => (
                    <tr key={client.id} className="border-b border-ink-900/10 last:border-0 hover:bg-paper-100/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border-2 border-ink-900 bg-amber-glow">
                            <User className="h-4 w-4" strokeWidth={2.25} />
                          </span>
                          <span className="font-display text-[14px] font-semibold text-ink-900">
                            {client.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${client.email}`}
                          className="inline-flex items-center gap-1.5 text-ink-900/75 transition-colors hover:text-cyan-spark"
                        >
                          <Mail className="h-3 w-3" strokeWidth={2.25} />
                          {client.email}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-ink-900/75">
                          <Phone className="h-3 w-3" strokeWidth={2.25} />
                          {client.phone ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-ink-900/75">
                          <Building2 className="h-3 w-3" strokeWidth={2.25} />
                          {client.school ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {client.plan ? (
                          <span
                            className={`inline-block rounded-md border-2 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] ${planStyles[client.plan]}`}
                          >
                            {client.plan}
                          </span>
                        ) : (
                          <span className="text-ink-900/45">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-[10.5px] text-ink-900/55">
                        {new Date(client.registeredAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/45">
            Dados vindos do Supabase (tabela profiles).
          </p>
        </>
      )}
    </div>
  );
}
