---

### Como começar o código na prática?

Agora que temos as **Skills** mapeadas e as **Regras de Tecnologia** definidas, qual é o próximo passo que você quer dar?
1. Criar a estrutura do banco de dados PostgreSQL (tabelas de usuários, projetos e assinaturas) para o **Supabase**.
2. Criar a estrutura inicial do projeto no terminal usando o **Vite** e configurar as pastas.

---

Admin · Projetos no Supabase

Para que o cadastro/lista de projetos do Admin salve no Supabase, crie a tabela abaixo:

SQL (rodar no Supabase SQL Editor)

```
create table if not exists public.admin_projects (
  id text primary key,
  title text not null,
  subtitle text,
  description text,
  difficulty text,
  duration text,
  materials jsonb,
  bncc jsonb,
  bncc_code text,
  bncc_competencies jsonb,
  illustration text,
  accent text,
  kind text,
  summary text,
  code text,
  ino_filename text,
  setup_steps jsonb,
  wiring_image_url text,
  wiring_image_alt text,
  wiring_caption text,
  hidden boolean default false,
  created_at timestamp with time zone default now()
);

-- Políticas (RLS) simples para desenvolvimento
alter table public.admin_projects enable row level security;
create policy "anon can read" on public.admin_projects for select using (true);
create policy "anon can insert" on public.admin_projects for insert with check (true);
create policy "anon can delete" on public.admin_projects for delete using (true);
```

Obs.: Em produção, substitua as políticas por regras autenticadas e escopo do usuário.

Variáveis de ambiente necessárias

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ADMIN_USERNAME=seu_usuario_admin
VITE_ADMIN_PASSWORD=sua_senha_admin
VITE_SUPABASE_ADMIN_PROJECTS_BUCKET=admin-projects
```

Storage (imagens)

1. Crie um bucket no Supabase Storage com o nome em `VITE_SUPABASE_ADMIN_PROJECTS_BUCKET` (ex.: `admin-projects`).
2. Políticas recomendadas (DEV autenticado):
   - SELECT: `using (bucket_id = 'admin-projects') and auth.role() = 'authenticated'`
   - INSERT: `with check (bucket_id = 'admin-projects') and auth.role() = 'authenticated'`
   - DELETE: `using (bucket_id = 'admin-projects') and auth.role() = 'authenticated'`
   Crie-as via Dashboard em Storage > Buckets > admin-projects > Policies.
3. No app, o upload exige que o usuário esteja logado no Supabase. As imagens são salvas em `<projectId>/<timestamp>-<arquivo>` e a URL pública é gravada em `admin_projects.wiring_image_url`.
