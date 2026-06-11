# Skill: Autenticação e Gestão de Usuários

## 1. Objetivo
Garantir o acesso seguro dos usuários à plataforma utilizando **Supabase Auth** como backend de identidade. O sistema segmenta visitantes, usuários gratuitos e assinantes ativos através de perfis armazenados no PostgreSQL com Row Level Security (RLS). O **painel administrativo** possui autenticação própria e independente (nome + senha, sem Supabase) — ver skill `1_skill_landing_page.md` seção 9.

## 2. Stack
- `@supabase/supabase-js` — cliente oficial do Supabase
- `react-router-dom` — rotas públicas e protegidas
- `localStorage` (navegador) — fallback para dados mockados enquanto o Supabase não é configurado

## 3. Estrutura de Arquivos

```
src/
├── lib/
│   └── supabaseClient.ts          # Cliente Supabase (URL + anon key)
├── features/
│   ├── auth/                      # Autenticação de usuários (Supabase)
│   │   ├── types.ts               # AuthState, Profile, UserPlan
│   │   ├── context/
│   │   │   └── AuthContext.tsx     # Provider + useAuth hook
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx  # Guard de rota por role
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx       # Login email/senha + Google OAuth
│   │   │   ├── RegisterPage.tsx    # Cadastro com nome, escola opcional
│   │   │   ├── RecoverPasswordPage.tsx # Fluxo "Esqueci minha senha"
│   │   │   ├── UpdatePasswordPage.tsx  # Redefinição de senha via token
│   │   │   └── AuthCallbackPage.tsx    # Callback OAuth (Google)
│   │   └── index.ts               # Exportações públicas
│   └── admin/                     # Autenticação do admin (independente)
│       └── context/
│           └── AdminAuthContext.tsx # Provider + useAdminAuth (nome+senha, localStorage)
```

## 4. Funcionalidades Implementadas

### 4.1 Cadastro (RegisterPage)
- Formulário com **Nome**, **E-mail**, **Senha** (mín. 6 caracteres) e campo opcional **Rede de Ensino / Escola**
- Após submit, exibe tela de confirmação com instruções para verificar o e-mail
- Link para login e opção "Criar com Google"

### 4.2 Login (LoginPage)
- Formulário de **e-mail + senha** com validação de erro
- Botão **"Esqueci minha senha"** que redireciona para recuperação
- **Login Social com Google** via OAuth (redirect para `/auth/callback`)
- Após login, redireciona de volta para a página que o usuário tentou acessar

### 4.3 Recuperação de Senha (RecoverPasswordPage)
- Input de e-mail → envia link de redefinição via Supabase
- Tela de confirmação após envio

### 4.4 Redefinição de Senha (UpdatePasswordPage)
- Acessada via token/link enviado por e-mail
- Formulário para definir nova senha (mín. 6 caracteres)
- Confirmação de sucesso com link para o início

### 4.5 Controle de Acesso (ProtectedRoute)
- Componente `ProtectedRoute` com suporte a `requiredPlan`
- Três níveis de plano: `gratis`, `professor`, `escola` (hierarquia: gratis < professor < escola)
- Exibe spinner "Verificando acesso…" enquanto carrega
- Redireciona para `/login` se não autenticado
- Redireciona para `/planos` se o plano não atende ao requisito

### 4.6 AuthCallbackPage
- Processa o redirect após OAuth do Google
- Recupera a sessão e redireciona para home ou login

## 5. Configuração do Supabase (necessário antes de usar)

### 5.1 Variáveis de ambiente
Criar arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sua-chave-anon-aqui
```
As chaves são obtidas em **Supabase Dashboard → Settings → API**.

### 5.2 Tabela `profiles`
Executar o script `supabase_setup.sql` no **SQL Editor** do Supabase. O script:
1. Cria a tabela `public.profiles` (id, name, email, phone, school, plan, timestamps)
2. Cria trigger `on_auth_user_created` — insere perfil automaticamente no signup
3. Ativa **Row Level Security (RLS)** — cada usuário vê/altera apenas o próprio perfil
4. Cria índices para busca por plano e e-mail

### 5.3 Autenticação
No painel Supabase:
- **Authentication → Providers → Email**: habilitar (default)
- **Authentication → Providers → Google**: habilitar e configurar Client ID + Secret (obtidos no Google Cloud Console)

## 6. Rotas de Autenticação

| Rota | Página | Acesso |
|---|---|---|
| `/login` | LoginPage | Público |
| `/auth/register` | RegisterPage | Público |
| `/auth/recover` | RecoverPasswordPage | Público |
| `/auth/update-password` | UpdatePasswordPage | Requer token |
| `/auth/callback` | AuthCallbackPage | Público (redirect OAuth) |

## 7. Estado do Header (TopNav)
### Usuário da plataforma (Supabase Auth)
- **Não logado**: botões "Entrar" (borda) e "Criar Conta" (violet-deep com shimmer hover)
- **Logado**: badge violeta com nome + botão "Sair" (borda, hover rose-pulse)

### Admin (independente da plataforma)
- Botão **Admin** (ícone Shield + label) sempre visível no TopNav, apontando para `/admin`
- Se não autenticado no admin, redireciona para `/admin/login`
- A sessão admin é independente da sessão do usuário (usa `AdminAuthContext` + `localStorage`, não Supabase)

## 8. Segurança

### Senhas
- Criptografadas automaticamente pelo Supabase Auth (bcrypt)
- Mínimo de 6 caracteres validado no frontend

### Sessão
- Gerenciada pelo Supabase via `autoRefreshToken` e `persistSession`
- `onAuthStateChange` mantém o `AuthContext` sincronizado
- Token JWT renovado automaticamente

### Row Level Security
- Política `Users can view own profile`: SELECT apenas do próprio `auth.uid()`
- Política `Users can update own profile`: UPDATE apenas do próprio `auth.uid()`
- Política `Service role can manage all profiles`: acesso total via service_role (admin futuro)

## 9. Status Atual e Próximos Passos
### ✅ Implementado
- `AuthContext` com `useAuth()` — signUp, signIn, signInWithGoogle, signOut, resetPassword, updateProfile, updateProfile
- Páginas: Login, Register, RecoverPassword, UpdatePassword, AuthCallback
- `ProtectedRoute` com suporte a `requiredPlan` (gratis, professor, escola)
- Integração com TopNav (estados logado/não logado)
- Script SQL idempotente (`supabase_setup.sql`) para tabela `profiles`, trigger e RLS
- `AdminAuthContext` independente (nome + senha, localStorage) — admin não depende de Supabase

### 🔜 Removido
A funcionalidade de comunidade (fórum) foi removida. O foco é apenas no catálogo de projetos, autenticação de usuários e painel admin.
