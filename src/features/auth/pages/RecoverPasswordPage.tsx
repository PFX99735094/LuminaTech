import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Mail, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function RecoverPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await resetPassword(email);
    if (err) {
      setError(err);
    } else {
      setSent(true);
    }
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
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900/65 transition-colors hover:text-ink-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao login
        </Link>

        {sent ? (
          <div className="text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink-900 bg-lime-spark">
              <Send className="h-6 w-6" strokeWidth={2.25} />
            </span>
            <h1 className="mt-5 font-display text-3xl font-black text-ink-900">E-mail enviado!</h1>
            <p className="mt-3 font-body text-[16px] text-ink-900/70">
              Enviamos um link de redefinição para <strong>{email}</strong>.
              Verifique sua caixa de entrada e spam.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="font-display text-4xl font-black text-ink-900">Recuperar senha</h1>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
                Enviaremos um link para seu e-mail
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

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[1px_1px_0_0_#4C1D95] disabled:opacity-50"
              >
                {loading ? 'Enviando…' : (
                  <>
                    <Mail className="h-4 w-4" strokeWidth={2.25} />
                    Enviar link de recuperação
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
