import type { User } from '@supabase/supabase-js';

export type UserPlan = 'gratis' | 'professor' | 'escola';

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  school: string | null;
  plan: UserPlan;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

export type AuthAction =
  | { type: 'SET_USER'; payload: { user: User | null; profile: Profile | null } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SIGN_OUT' };
