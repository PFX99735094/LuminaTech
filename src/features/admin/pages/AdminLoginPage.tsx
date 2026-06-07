import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Key, LayoutDashboard, LogIn, Shield, User } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export function AdminLoginPage() {
  const { login, admin } = useAdminAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (admin) {
    return (
      <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
        <header className="sticky top-0 z-50 w-full border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
          <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
            <Link to="/" className="group flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50">
                <Shield className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[20px] font-bold tracking-tight text-ink-900">
                  Admin
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
                  acesso restrito
                </span>
              </div>
            </Link>
            <Link
              to="/admin"
              className="group inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-paper-50 transition-all hover:bg-cyan-spark hover:text-ink-900"
            >
              <LayoutDashboard className="h-4 w-4" strokeWidth={2.25} />
            Ir para o painel →
            </Link>
          </nav>
        </header>
        <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 lg:px-10">
          <div className="rounded-xl border-2 border-ink-900 bg-paper-50 p-8 shadow-[6px_6px_0_0_#4C1D95]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-cyan-spark text-ink-900">
                <Shield className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <div>
                <h1 className="font-display text-xl font-bold text-ink-900">Já está logado</h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-900/55">
                  {admin.name} · sessão ativa
                </p>
              </div>
            </div>
            <Link
              to="/admin"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-violet-deep px-4 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[2px_2px_0_0_#4C1D95]"
            >
              Acessar painel
              <LayoutDashboard className="h-4 w-4" strokeWidth={2.25} />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = login(name, password);
    if (result) {
      setError(result);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
      <header className="sticky top-0 z-50 w-full border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
        <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50">
              <Shield className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[20px] font-bold tracking-tight text-ink-900">
                Admin
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
                acesso restrito
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Site
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-7xl items-center justify-center px-6 lg:px-10">
        <div className="w-full max-w-md">
          <div className="rounded-xl border-2 border-ink-900 bg-paper-50 p-8 shadow-[6px_6px_0_0_#4C1D95]">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-violet-deep text-paper-50">
                <Key className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <div>
                <h1 className="font-display text-xl font-bold text-ink-900">Acesso Administrativo</h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-900/55">
                  informe suas credenciais
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-name"
                  className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900/70"
                >
                  Nome
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/40" strokeWidth={2} />
                  <input
                    id="admin-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="escreva seu nome"
                    autoComplete="username"
                    autoFocus
                    className="w-full rounded-md border-2 border-ink-900/20 bg-paper-50 py-2.5 pl-10 pr-3 font-mono text-[13px] text-ink-900 placeholder-ink-900/30 transition-colors focus:border-violet-deep focus:outline-none focus:ring-2 focus:ring-violet-deep/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900/70"
                >
                  Senha
                </label>
                <div className="relative mt-1.5">
                  <Key className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-900/40" strokeWidth={2} />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="digite sua senha"
                    autoComplete="current-password"
                    className="w-full rounded-md border-2 border-ink-900/20 bg-paper-50 py-2.5 pl-10 pr-10 font-mono text-[13px] text-ink-900 placeholder-ink-900/30 transition-colors focus:border-violet-deep focus:outline-none focus:ring-2 focus:ring-violet-deep/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-900/40 transition-colors hover:text-ink-900"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="flex items-center gap-1.5 rounded-md border-2 border-rose-pulse/40 bg-rose-pulse/10 px-3 py-2 font-mono text-[11px] text-rose-deep">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-pulse" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-md bg-violet-deep px-4 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[2px_2px_0_0_#4C1D95] disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" strokeWidth={2.25} />
                {loading ? 'Verificando...' : 'Entrar no painel'}
              </button>
            </form>

            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-900/40">
              Área restrita · apenas administradores
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/55 hover:text-violet-deep"
            >
              ← voltar para o início
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
