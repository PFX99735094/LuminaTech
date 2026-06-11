import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Cpu, Eye, EyeOff, KeyRound } from 'lucide-react';
import { supabaseAuth } from '../../../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export function UpdatePasswordPage() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    const { error: err } = await supabaseAuth.updateUser({ password });
    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
    }
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
        {success ? (
          <div className="text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink-900 bg-lime-spark">
              <KeyRound className="h-6 w-6" strokeWidth={2.25} />
            </span>
            <h1 className="mt-5 font-display text-3xl font-black text-ink-900">Senha atualizada!</h1>
            <p className="mt-3 font-body text-[16px] text-ink-900/70">
              Sua senha foi alterada com sucesso.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50"
            >
              Ir para o início
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="font-display text-4xl font-black text-ink-900">Nova senha</h1>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
                Escolha sua nova senha
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              {error && (
                <div className="rounded-xl border-2 border-rose-deep bg-rose-pulse/15 p-4 font-mono text-[12px] text-rose-deep">
                  {error}
                </div>
              )}

              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900/70">Nova senha</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 pr-10 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
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

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[1px_1px_0_0_#4C1D95]"
              >
                <KeyRound className="h-4 w-4" strokeWidth={2.25} />
                Atualizar senha
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
