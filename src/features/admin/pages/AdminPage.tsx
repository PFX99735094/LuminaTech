import { useState, useMemo, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Cpu,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Shield,
  Users,
} from 'lucide-react';
// Cadastro de projeto removido: mantemos projetos somente no código
import { ListaClientes } from '../components/ListaClientes';
import { ListaProjetos } from '../components/ListaProjetos';
import { useAdminAuth } from '../context/AdminAuthContext';
import { projects as allProjects } from '../../landing/data/projects';
import { bnccPillars } from '../../landing/data/bnccAreas';

type Tab = 'dashboard' | 'clientes' | 'projetos';

const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'clientes', label: 'Clientes', icon: Users },
  { key: 'projetos', label: 'Projetos', icon: FolderKanban },
];

export function AdminPage() {
  const { admin, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
      <AdminHeader adminName={admin.name} onLogout={logout} />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-24 pt-8 lg:flex-row lg:px-10">
        <aside className="shrink-0 lg:w-60">
          <nav className="flex flex-wrap gap-1.5 lg:flex-col">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-2 rounded-md border-2 px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-all lg:w-full ${
                  activeTab === key
                    ? 'border-ink-900 bg-violet-deep text-paper-50 shadow-[3px_3px_0_0_#4C1D95]'
                    : 'border-ink-900/20 bg-paper-50 text-ink-900/70 hover:border-ink-900 hover:text-ink-900'
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="rounded-xl border-2 border-ink-900 bg-paper-50 p-6 shadow-[5px_5px_0_0_#4C1D95] lg:p-8">
            {activeTab === 'dashboard' && <Dashboard />}
            {/* Aba de cadastro removida */}
            {activeTab === 'clientes' && <ListaClientes />}
            {activeTab === 'projetos' && <ListaProjetos />}
          </div>
        </main>
      </div>

      <AdminFooter />
    </div>
  );
}

function Dashboard() {
  const [clientsCount, setClientsCount] = useState<number | null>(null);
  const [escolasCount, setEscolasCount] = useState<number | null>(null);
  const [supabaseError, setSupabaseError] = useState(false);

  const originaisCount = useMemo(() => allProjects.length, []);
  // Exibir apenas os projetos originais no painel, conforme solicitado
  const projetosCount = originaisCount;
  const bnccCount = bnccPillars.length;

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      try {
        const { supabase } = await import('../../../lib/supabaseClient');
        const { data: profiles, error } = await supabase.rpc('get_all_profiles');
        if (cancelled) return;
        if (error) {
          setSupabaseError(true);
          return;
        }
        const total = (profiles ?? []).length;
        setClientsCount(total);

        const escolasFiltered = (profiles ?? []).filter(
          (r: Record<string, unknown>) => r.plan === 'escola'
        ).length;
        setEscolasCount(escolasFiltered);
      } catch {
        if (!cancelled) setSupabaseError(true);
      }
    }
    fetch();
    return () => { cancelled = true; };
  }, []);

  const stats = [
    { label: 'Projetos', value: String(projetosCount), desc: `${originaisCount} originais`, accent: 'bg-cyan-spark' },
    { label: 'Clientes', value: supabaseError ? '—' : String(clientsCount ?? '…'), desc: supabaseError ? 'Supabase não configurado' : 'Cadastrados', accent: 'bg-violet-spark' },
    { label: 'Áreas BNCC', value: String(bnccCount), desc: 'Mapeadas', accent: 'bg-lime-spark' },
    { label: 'Escolas', value: supabaseError ? '—' : String(escolasCount ?? '…'), desc: supabaseError ? 'Supabase não configurado' : 'Plano Escola', accent: 'bg-amber-glow' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-ink-900">Painel Administrativo</h2>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
          Lúmina Tech — dados em tempo real
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border-2 border-ink-900 bg-paper-50 p-5 shadow-[3px_3px_0_0_#4C1D95]"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-black text-ink-900">{stat.value}</span>
              <span className={`h-3 w-3 rounded-full ${stat.accent}`} />
            </div>
            <p className="mt-2 font-display text-[16px] font-semibold text-ink-900">{stat.label}</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-900/55">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/60 p-6">
        <h3 className="flex items-center gap-2 font-display text-[17px] font-semibold text-ink-900">
          <Cpu className="h-4 w-4 text-cyan-spark" strokeWidth={2.25} />
          Área administrativa
        </h3>
        <p className="mt-2 max-w-xl font-body text-[14.5px] leading-[1.55] text-ink-900/70">
          Use o menu ao lado para navegar entre as seções.
        </p>
        <ul className="mt-4 space-y-1.5 font-mono text-[12px] text-ink-900/60">
          {/* Item de cadastro removido */}
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-spark" />
            <span><strong className="text-ink-900">Clientes</strong> — dados vindos do Supabase (tabela profiles)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-spark" />
            <span><strong className="text-ink-900">Projetos</strong> — relação completa de todos os projetos (originais + criados no admin)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface AdminHeaderProps {
  adminName: string;
  onLogout: () => void;
}

function AdminHeader({ adminName, onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50">
            <LayoutDashboard className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[20px] font-bold tracking-tight text-ink-900">
              Admin
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
              painel de controle
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-md border-2 border-violet-deep/30 bg-violet-deep/[0.08] px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-violet-deep sm:inline-flex">
            <Shield className="h-4 w-4" strokeWidth={2.25} />
            {adminName}
          </span>
          <button
            onClick={onLogout}
            className="group inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-rose-pulse hover:text-paper-50"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Sair
          </button>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Site
          </Link>
        </div>
      </nav>
    </header>
  );
}

function AdminFooter() {
  return (
    <footer className="border-t-2 border-ink-900/10 bg-gradient-to-r from-violet-deep to-ink-900 py-8 text-paper-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-6 sm:flex-row sm:items-center lg:px-10">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/55">
          © 2026 Lúmina Tech · admin interno
        </p>
        <Link
          to="/"
          className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-50/75 hover:text-cyan-spark"
        >
          ← voltar para o site
        </Link>
      </div>
    </footer>
  );
}
