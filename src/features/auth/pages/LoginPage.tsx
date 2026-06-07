import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Cpu, Eye, EyeOff, LogIn, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { user, signIn, signInWithGoogle } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to={from} replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    if (err) setError(err);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-paper-50 font-body text-ink-900 selection:bg-cyan-spark selection:text-ink-900">
      <header className="border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center px-6 lg:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-violet-deep text-paper-50">
              <Cpu className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="font-display text-[17px] font-bold tracking-tight text-ink-900">
              Lúmina Tech
            </span>
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col px-6 py-16 lg:py-24">
        <div className="text-center">
          <h1 className="font-display text-4xl font-black text-ink-900">Entrar</h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
            Acesse sua conta Lúmina Tech
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {error && (
            <div className="rounded-xl border-2 border-rose-deep bg-rose-pulse/15 p-4 font-mono text-[12px] text-rose-deep">
              {error}
            </div>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900/70">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="seu@email.com"
              required
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900/70">Senha</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 pr-10 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                placeholder="Sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-900/40 hover:text-ink-900"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-end">
            <Link
              to="/auth/recover"
              className="font-mono text-[11px] text-ink-900/60 underline decoration-1 underline-offset-2 hover:text-cyan-spark"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[1px_1px_0_0_#4C1D95] disabled:opacity-50"
          >
            {loading ? 'Entrando…' : (
              <>
                <LogIn className="h-4 w-4" strokeWidth={2.25} />
                Entrar
              </>
            )}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dashed border-ink-900/15" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-paper-50 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-900/45">
                ou
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-ink-900/[0.03]"
          >
            <Mail className="h-4 w-4" strokeWidth={2.25} />
            Entrar com Google
          </button>
        </form>

        <p className="mt-8 text-center font-mono text-[11px] text-ink-900/60">
          Não tem conta?{' '}
          <Link to="/auth/register" className="font-bold text-cyan-spark underline decoration-2 underline-offset-4 hover:text-cyan-deep">
            Criar conta grátis
          </Link>
        </p>
      </main>
    </div>
  );
}
