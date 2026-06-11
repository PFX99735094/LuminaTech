import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// Admin credentials are provided via environment variables to avoid hardcoding secrets
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME as string | undefined;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
const STORAGE_KEY = 'admin_auth';

interface AdminUser {
  name: string;
  loggedAt: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  login: (name: string, password: string) => string | null;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as AdminUser;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [admin]);

  const login = (name: string, password: string): string | null => {
    if (!name.trim()) return 'Digite o nome de administrador.';
    if (!password) return 'Digite a senha.';
    // If env vars are not set, prevent login and guide configuration
    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      return 'Acesso admin não configurado. Defina VITE_ADMIN_USERNAME e VITE_ADMIN_PASSWORD no .env';
    }
    if (name.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return 'Nome ou senha inválidos.';
    }
    setAdmin({ name: name.trim(), loggedAt: new Date().toISOString() });
    return null;
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth deve ser usado dentro de AdminAuthProvider');
  return ctx;
}
