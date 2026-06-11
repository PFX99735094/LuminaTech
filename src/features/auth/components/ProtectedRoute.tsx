import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserPlan } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPlan?: UserPlan[];
  redirectTo?: string;
}

const planHierarchy: Record<UserPlan, number> = {
  gratis: 1,
  professor: 2,
  escola: 3,
};

function meetsRequirement(userPlan: UserPlan | null, required?: UserPlan[]): boolean {
  if (!required || required.length === 0) return true;
  if (!userPlan) return false;
  const userLevel = planHierarchy[userPlan];
  return required.some((r) => userLevel >= planHierarchy[r]);
}

export function ProtectedRoute({
  children,
  requiredPlan,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper-50">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-ink-900/20 border-t-cyan-spark" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
            Verificando acesso…
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!meetsRequirement(profile?.plan ?? null, requiredPlan)) {
    // Redirect to home with anchor to the pricing/planos section
    return <Navigate to="/#planos" replace />;
  }

  return <>{children}</>;
}
