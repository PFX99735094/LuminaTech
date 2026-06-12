-- ============================================================
-- Setup do Supabase para Ateliê.Robô
-- Execute no SQL Editor do painel Supabase (em ordem)
-- ============================================================

-- 1. Tabela de perfis (estende o auth.users do Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  school TEXT,
  plan TEXT NOT NULL DEFAULT 'gratis' CHECK (plan IN ('gratis', 'professor', 'escola')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Trigger para criar perfil automaticamente no signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, plan)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'gratis'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- recria o trigger de forma idempotente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas idempotentes para a tabela profiles
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own profile'
      AND schemaname = 'public' AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON public.profiles FOR SELECT
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile'
      AND schemaname = 'public' AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON public.profiles FOR UPDATE
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Service role can manage all profiles'
      AND schemaname = 'public' AND tablename = 'profiles'
  ) THEN
    CREATE POLICY "Service role can manage all profiles"
      ON public.profiles FOR ALL
      USING (auth.role() = 'service_role');
  END IF;
END $$;

-- 4. Índices
CREATE INDEX IF NOT EXISTS idx_profiles_plan ON public.profiles(plan);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 5. Tabela de projetos do admin (catálogo interno)
CREATE TABLE IF NOT EXISTS public.admin_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  difficulty TEXT,
  duration TEXT,
  materials JSONB,
  bncc JSONB,
  bncc_code TEXT,
  bncc_competencies JSONB,
  illustration TEXT,
  accent TEXT,
  kind TEXT,
  summary TEXT,
  code TEXT,
  ino_filename TEXT,
  setup_steps JSONB,
  wiring_image_url TEXT,
  wiring_image_alt TEXT,
  wiring_caption TEXT,
  hidden BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_projects ENABLE ROW LEVEL SECURITY;

-- Políticas simples para desenvolvimento; endureça em produção
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'anon can read admin_projects'
  ) THEN
    CREATE POLICY "anon can read admin_projects" ON public.admin_projects
      FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'anon can insert admin_projects'
  ) THEN
    CREATE POLICY "anon can insert admin_projects" ON public.admin_projects
      FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'anon can delete admin_projects'
  ) THEN
    CREATE POLICY "anon can delete admin_projects" ON public.admin_projects
      FOR DELETE USING (true);
  END IF;
END $$;

-- 6. Storage: bucket para imagens de projetos do admin
-- Observação: o Storage pode ser criado pelo Dashboard. Abaixo segue criação via SQL/metadata.
INSERT INTO storage.buckets (id, name, public)
  VALUES ('admin-projects', 'admin-projects', true)
  ON CONFLICT (id) DO NOTHING;

-- Políticas do Storage (DEV) – criar via Dashboard (não por SQL):
-- Storage > Buckets > admin-projects > Policies:
-- 1) Public read admin-projects (SELECT): USING (bucket_id = 'admin-projects')
-- 2) Public upload admin-projects (INSERT): WITH CHECK (bucket_id = 'admin-projects')
-- 3) Public delete admin-projects (DELETE): USING (bucket_id = 'admin-projects')

-- 7. Função RPC para excluir usuários (rodar com SECURITY DEFINER para poder deletar de auth.users)
CREATE OR REPLACE FUNCTION public.delete_user_by_id(user_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM auth.users WHERE id = user_id;
END;
$$;

