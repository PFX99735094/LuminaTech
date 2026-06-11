import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import { supabaseAuth } from '../../../lib/supabaseClient';
import type { AuthState, AuthAction, Profile } from '../types';

const initialState: AuthState = {
  user: null,
  profile: null,
  loading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload.user, profile: action.payload.profile, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SIGN_OUT':
      return { user: null, profile: null, loading: false };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (name: string, email: string, password: string, school?: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Perfil via tabela 'profiles' desativado — mantemos apenas autenticação
async function fetchProfile(_userId: string): Promise<Profile | null> { return null; }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    supabaseAuth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      const profile = user ? await fetchProfile(user.id) : null;
      dispatch({ type: 'SET_USER', payload: { user, profile } });
    });

    const { data: { subscription } } = supabaseAuth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user ?? null;
        const profile = user ? await fetchProfile(user.id) : null;
        dispatch({ type: 'SET_USER', payload: { user, profile } });
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    const { error } = await supabaseAuth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signUp(name: string, email: string, password: string, school?: string) {
    const { error } = await supabaseAuth.signUp({
      email,
      password,
      options: {
        data: { name, school: school ?? null },
      },
    });
    return { error: error?.message ?? null };
  }

  async function signInWithGoogle() {
    await supabaseAuth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function signOut() {
    await supabaseAuth.signOut();
    dispatch({ type: 'SIGN_OUT' });
  }

  async function resetPassword(email: string) {
    const { error } = await supabaseAuth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    return { error: error?.message ?? null };
  }

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signUp, signInWithGoogle, signOut, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
