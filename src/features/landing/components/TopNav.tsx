import { Cpu, LogIn, LogOut, Shield, User, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth';

const navLinks = [
  { label: 'Projetos', href: '/projetos', route: true },
  { label: 'BNCC', href: '/bncc', route: true },
  { label: 'Planos', href: '#planos', route: false },

];

export function TopNav() {
  const { user, profile, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink-900/10 bg-paper-50/85 backdrop-blur-md motion-safe:animate-fade-down">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3 motion-safe:animate-logo-float">
          <span className="relative grid h-11 w-11 place-items-center rounded-md bg-violet-deep text-paper-50 transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(109,40,217,0.5)]">
            <Cpu className="h-6 w-6 motion-safe:animate-glow-pulse" strokeWidth={2.25} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-cyan-spark motion-safe:animate-glow-pulse" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[20px] font-bold tracking-tight text-ink-900">
              Lúmina Tech
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
              v1.0 · maker lab
            </span>
          </div>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.route ? (
                <Link
                  to={link.href}
                  className="group relative font-mono text-[13px] font-bold uppercase tracking-[0.16em] text-ink-900/85 transition-all duration-200 hover:text-violet-deep hover:tracking-[0.2em]"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-violet-deep transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="group relative font-mono text-[13px] font-bold uppercase tracking-[0.16em] text-ink-900/85 transition-all duration-200 hover:text-violet-deep hover:tracking-[0.2em]"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-violet-deep transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-md border-2 border-violet-deep/30 bg-violet-deep/[0.06] px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-violet-deep hover:border-violet-deep hover:bg-violet-deep hover:text-paper-50"
          >
            <Shield className="h-4 w-4 motion-safe:animate-glow-pulse" strokeWidth={2.25} />
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/login"
                onClick={() => signOut()}
                className="hidden items-center gap-1.5 rounded-md border-2 border-ink-900/20 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/[0.04] sm:inline-flex"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Link>
              <span className="hidden items-center gap-1.5 rounded-md border-2 border-violet-deep/30 bg-violet-deep/[0.08] px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-violet-deep sm:inline-flex">
                <User className="h-4 w-4" />
                {profile?.name?.split(' ')[0] ?? 'Conta'}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden items-center gap-1.5 rounded-md border-2 border-ink-900/20 bg-paper-50 px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/[0.04] sm:inline-flex"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
              <Link
                to="/auth/register"
                className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-md bg-violet-deep px-4 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-paper-50 hover:bg-cyan-spark hover:text-ink-900"
              >
                <UserPlus className="relative h-4 w-4" />
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
