import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAuth } from '../../../lib/supabaseClient';

export function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    supabaseAuth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-paper-50">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-ink-900/20 border-t-cyan-spark" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
          Autenticando…
        </span>
      </div>
    </div>
  );
}
