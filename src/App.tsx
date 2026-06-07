import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BnccPage, LandingPage, ProjectDetailPage, ProjectsPage } from './features/landing';
import { AdminLoginPage, AdminPage } from './features/admin';
import { AdminAuthProvider } from './features/admin/context/AdminAuthContext';
import {
  AuthCallbackPage,
  AuthProvider,
  LoginPage,
  RecoverPasswordPage,
  RegisterPage,
  UpdatePasswordPage,
} from './features/auth';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bncc" element={<BnccPage />} />
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/projetos/:id" element={<ProjectDetailPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/recover" element={<RecoverPasswordPage />} />
            <Route path="/auth/update-password" element={<UpdatePasswordPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
          </Routes>
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
