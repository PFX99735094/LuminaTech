# Skill: Landing Page e Vitrine Pública

## 1. Objetivo
Apresentar o SaaS, reter a atenção do professor da rede pública e demonstrar o valor prático da plataforma antes de exigir qualquer cadastro ou pagamento. A vitrine deve transmitir confiança com cores modernas, animações sutis e um catálogo de projetos que cresça sem quebrar o design. O admin panel permite gerenciar projetos e visualizar clientes com autenticação simples (nome + senha) — dados salvos no `localStorage`.

## 2. Funcionalidades Principais

### 2.1 Apresentação de Valor (Hero Section)
* Headline com tipografia display e itálico destacado em cor de marca.
* Subtítulo com a dor principal do professor (falta de tempo, código difícil, orçamento curto).
* Dois CTAs primários: "Criar Conta Grátis" (violet-deep) e "Ver projetos prontos" (outline com ancora para a vitrine).
* Stats em linha (projetos publicados, escolas usando, tempo por aula) com número em fonte display e label em mono.
* Card lateral com **foto real de um Arduino Uno R3** destacado (fonte: RobotShop CDN) — substitui o SVG schematic anterior. Badges "arduino · uno r3", "passo 3/4" e "↳ 47 bncc" mantidos.

### 2.2 Vitrine Curta (4 Projetos em Destaque)
* Grid responsivo 1 → 2 → 4 colunas.
* Cada card exibe: ilustração SVG, número do projeto, código BNCC curto, badge de dificuldade (cor dinâmica via `accent.deep` do projeto), título, subtítulo, descrição, duração, materiais e CTA "Ver código".
* Cards com borda dupla em `ink-900`, sombra deslocada em violeta escuro (`#4C1D95`, estilo neo-brutalista) e efeito hover `-translate-y-1 + translate-x-[-2px]`.
* Ordenação por dificuldade (Iniciante → Avançado) para criar uma trilha de aprendizado.
* **Botão "Ver todos os N projetos"** abaixo do grid (bg violet-deep, hover cyan-spark), navegando para `/projetos`.

### 2.3 Catálogo Completo (`/projetos`)
* Rota dedicada renderizada via React Router.
* Hero próprio com a paleta de cores em pílulas e frase de impacto "N projetos prontos para a sua próxima aula".
* **Barra de busca textual** com filtro por título, área BNCC e material.
* **Filtro de dificuldade** em pílulas (Todos / Iniciante / Intermediário / Avançado) com estado visual ativo (fundo violet-deep + sombra cyan).
* Grid 1 → 2 → 3 → 4 colunas reusando o mesmo componente `ProjectCard`.
* Estado vazio com CTA "Limpar filtros" quando não há resultados.
* Bloco final de upgrade (plano Escola, projetos sob medida).
* Header próprio com botão "Voltar" para `/` e footer enxuto (bg gradient violet-deep → ink-900).

### 2.4 Alinhamento Pedagógico (BNCC)
* **9 áreas BNCC** mapeadas (Matemática, Ciências, Física, Geografia, Língua Portuguesa, Artes, História, Tecnologia, **Robótica**). Robótica entra como disciplina integradora, com habilidades próprias (EF0*ROB0*).
* Tela dedicada em `/bncc` com filtro por área, busca por código EF e lista de projetos que usam cada área. Cada área exibe ícone, código, descrição, habilidades (código + título + descrição) e projetos relacionados.
* Seção "Habilidades BNCC" dentro de `/projetos/:id` mostra as competências que o projeto trabalha, com chip por área, código em destaque, título e descrição BNCC, e link para a página BNCC completa.
* Componente `BnccAlignment` na home exibe as 9 áreas como cards compactos com contagem de projetos, com CTA "Abrir mapeamento BNCC" apontando para `/bncc`.
* Dados das áreas + competências vivem em `data/bnccAreas.ts` (constantes `bnccPillars` e `bnccCompetencies` indexada por código).
* Map de ícones cobre todas as `BnccArea` do tipo para evitar erro de chave.

### 2.5 Chamada para Ação (CTA)
* Seção com fundo gradient `from-violet-deep to-ink-900` e glow orbs.
* Botão "Criar Conta Grátis" (cyan-spark) e "Conhecer Planos" (outline) sempre visíveis.
* Card visual de preço (R$ 0, sem cartão, 14 dias pro) com stickers rotacionados.

### 2.6 Painel Administrativo (`/admin`)
* **Protegido por autenticação simples** (nome + senha) com sessão persistida em `localStorage`.
* Rota `/admin/login` exibe formulário com campos de nome e senha; `/admin` redireciona para login se não autenticado.
* Credenciais padrão: `Claudio` / `ana@2026` (configuráveis em `context/AdminAuthContext.tsx`).
* Sidebar de navegação com 4 abas: **Dashboard**, **Cadastrar Projeto**, **Clientes**, **Projetos**.
* **Dashboard**: cards de resumo (projetos, clientes, áreas BNCC, escolas) e descrição das seções.
* **Cadastrar Projeto**: formulário completo com:
  - Dados do card (título, slug, subtítulo, descrição, dificuldade, duração, ilustração, cor de destaque)
  - Áreas e competências BNCC (select múltiplo + input de código com tags)
  - Materiais (input com tags)
  - **Upload de imagem do esquema de ligação** (PNG/JPG/WEBP, máx 2 MB) — convertido para base64 e armazenado no `localStorage`, com preview
  - Texto alternativo (alt) e legenda da imagem
  - Tipo de projeto (Arduino / Mecânica) e nome do arquivo `.ino`
  - Resumo da página de detalhes
  - **Editor de código Arduino** (textarea monospace com fundo escuro)
  - **Passo a passo em sala** (etapas numeradas com input de tags)
  - Dados persistidos no `localStorage` (chave `admin_projects`)
* **Clientes**: tabela com dados mockados (5 clientes) — nome, e-mail, telefone, plano (grátis/professor/escola), data de cadastro. Busca textual por nome/e-mail/telefone.
* **Projetos**: tabela completa com todos os projetos (originais + criados no admin). Funcionalidades:
  - Filtro por dificuldade e busca textual
  - Badge de fonte (Original roxo / Admin ciano)
  - **Excluir qualquer projeto** — originais são ocultados via `localStorage` (chave `hidden_project_ids`), projetos admin são removidos. Confirmação antes de excluir.
  - **Restaurar** projetos excluídos
  - Link para a página de detalhes do projeto

## 3. Componentes Reutilizáveis

| Componente | Caminho | Uso |
|---|---|---|
| `ProjectCard` | `features/landing/components/ProjectCard.tsx` | Card padrão usado em vitrine e catálogo |
| `ProjectIllustration` | `features/landing/components/illustrations/ProjectIllustration.tsx` | SVG por chave (`IllustrationKey`) |
| `accentMap` | `features/landing/components/ProjectCard.tsx` | Mapeia `AccentKey` → classes Tailwind (bg/text/ring/chip) |
| `TopNav`, `Footer` | `features/landing/components/` | Navegação com `Link` do `react-router-dom` para rotas internas |
| `AdminPage` | `features/admin/pages/AdminPage.tsx` | Painel admin com 4 abas (Dashboard, Cadastro, Clientes, Projetos) |
| `AdminLoginPage` | `features/admin/pages/AdminLoginPage.tsx` | Tela de login com nome + senha do admin |
| `AdminAuthContext` | `features/admin/context/AdminAuthContext.tsx` | Contexto de autenticação admin (login/logout/persistência localStorage) |
| `CadastroProjeto` | `features/admin/components/CadastroProjeto.tsx` | Formulário completo de cadastro com upload de imagem e código |
| `ListaClientes` | `features/admin/components/ListaClientes.tsx` | Tabela de clientes com busca |
| `ListaProjetos` | `features/admin/components/ListaProjetos.tsx` | Tabela de projetos com delete/restore |

## 4. Modelo de Dados

`Project` em `features/landing/types.ts`:
* `id`, `title`, `subtitle`, `description`
* `difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'`
* `duration`, `materials: string[]`
* `bncc: BnccArea[]`, `bnccCode: string`
* `illustration: IllustrationKey`
* `accent: AccentKey` (amber, lime, cyan, rose, violet, teal, orange, fuchsia)

Adicionar projeto novo = 1 entrada em `data/projects.ts` + 1 caso no `ProjectIllustration`. Sem mexer em layout.

`Client` em `features/admin/types.ts`:
* `id`, `name`, `email`, `phone`
* `registeredAt: string` (ISO date)
* `plan?: 'gratis' | 'professor' | 'escola'`

Dados mockados em `features/admin/data/clients.ts` — 5 clientes de exemplo.

`ProjetoForm` (admin internamente em `CadastroProjeto.tsx`):
* Estende os campos de `Project` com dados de detalhes: `kind`, `summary`, `code`, `inoFilename`, `setupSteps`
* `wiringImage: string` — data URL base64 da foto do esquema
* `wiringImageAlt`, `wiringCaption` — metadados da imagem
* Persistido em `localStorage` (chave `admin_projects`)
* Exclusão de projetos originais rastreada via `localStorage` (chave `hidden_project_ids`)

## 5. Paleta de Cores (Tailwind extend) — "Neural Cockpit"

Direção estética: base fria (azul-noite) com acentos elétricos que evocam **IA/robótica moderna**. Cyan é a cor primária da marca (brand mark, hover de botões, itálicos de impacto, sublinhados de headline). Violeta escuro (`violet-deep`) substitui o preto puro como fundo de botões e elementos de destaque — mais moderno e atrativo para crianças e professores.

**Base (fria, alto contraste):**
* `ink-900` `#070B14` · texto, bordas de cards, detalhes estruturais
* `ink-800` `#0E1424` · sombra mais suave, gradientes
* `ink-700` `#161D2F` · PCB nos SVGs, gradientes
* `paper-50` `#F2F4F8` · fundo principal (off-white frio)
* `paper-100` `#E5E8EF` · fundo alternativo

**Primária de interface (nova):**
* `violet-deep` `#6D28D9` · fundo de botões principais (CTA Hero, "Criar Conta", "Ver todos"), logotipo, badges ativos
* `#4C1D95` · sombras deslocadas (cards, botões, inputs) — substitui `#070B14` nos shadow tokens

**Acentos (par `spark` claro + `deep` escuro):**
* `cyan` (`#22D3EE` / `#0E7490`) — **primária da marca** (CTA, brand mark, itálico)
* `violet` (`#A78BFA` / `#6D28D9`) — neural
* `fuchsia` (`#E879F9` / `#A21CAF`) — holograma
* `lime` (`#A3E635` / `#4D7C0F`) — LED, OK, sucesso
* `teal` (`#2DD4BF` / `#0F766E`) — data flow
* `orange` (`#FB923C` / `#C2410C`) — robótica, energia
* `amber` (`#FBBF24` / `#B45309`) — "tape label" sticker neo-brutalista, badges numerados
* `rose` (`#FB7185` / `#BE123C`) — box de aviso, alerta

8 acentos suportam até 8 cards distintos na vitrine (1 por projeto, sem repetição).

**Onde cyan aparece como brand:**
* Brand mark `Ateliê.<span text-cyan-spark>Robô` em TopNav, Footer, header de detalhe
* Itálico de impacto em headlines (`text-cyan-spark`)
* Hover de botões principais: `hover:bg-cyan-spark hover:text-ink-900`
* Sublinhado de destaque (Hero "real", ProjectShowcase, ProjectsPage): `bg-cyan-spark`
* Background blur orbs (Hero, ProjectsPage, CTASection): `bg-cyan-spark/25–30`
* Botão de download de código (CodeBlock) e seleção de texto: `bg-cyan-spark`

**Onde violet aparece como interface (novo):**
* Botões primários: `bg-violet-deep text-paper-50` (CTA Hero, "Criar Conta", "Ver todos", "Salvar Projeto")
* Logotipo e ícones de header: `bg-violet-deep`
* Seções escuras (CTA, Footer, CodeBlock): `bg-gradient-to-r from-violet-deep to-ink-900`
* Badge de filtro ativo: `bg-violet-deep text-paper-50 shadow-[2px_2px_0_0_#22D3EE]`

**Onde amber aparece (pontual, neo-brutalista):**
* Stickers/badges numerados das seções (`01`, `02`, …)
* MacOS-style window dots em CodeBlock/Hero
* Pinos de LEDs em ilustrações que precisam do "amarelo quente" (e.g., semáforo)
* Card de "passo 3/4" no Hero (badge rotacionado)
* Os 8 acentos disponíveis no `ProjectCard` continuam disponíveis para os projetos; o lixeira pode seguir `amber` sem perder a coesão da marca — o brand é cyan, o tema de cada card é livre.

## 6. Roteamento
* `react-router-dom` com `BrowserRouter` em `App.tsx`.
* `/` → `LandingPage` (vitrine curta + BNCC + CTA).
* `/bncc` → `BnccPage` (mapeamento completo das 9 áreas BNCC com busca e filtro).
* `/projetos` → `ProjectsPage` (catálogo completo com busca e filtros).
* `/projetos/:id` → `ProjectDetailPage` (esquema de ligação + código `.ino` + habilidades BNCC + download).
* `/admin` → `AdminPage` (painel administrativo — redireciona para `/admin/login` se não autenticado).
* `/admin/login` → `AdminLoginPage` (formulário de login nome + senha; redireciona para `/admin` se já logado).
* `TopNav` e `Footer` usam `Link` para `/projetos`, `/bncc` e `/admin` quando o destino é interno.

## 7. Página de Detalhes do Projeto

CTA "Ver código" em todo `ProjectCard` aponta para `/projetos/:id` (não mais para `/login`). As fotos reais das montagens usadas pelo `WiringDiagram` ficam em `public/wiring/` (servidas como estáticos pelo Vite). Padrão visual, convenção de nomes e checklist de "como adicionar foto nova" estão documentados em `public/wiring/README.md`. A página traz, em ordem:

1. **Hero do projeto** — título, dificuldade, duração, BNCC e resumo próprio.
2. **Esquema de ligação** (foto real) — `WiringDiagram` por `projectId`, renderizado como `<img>` apontando para `public/wiring/<projectId>.<jpg|png|webp>`. A imagem é uma **foto real da montagem** (Arduino + componentes reais, fundo branco, jumpers coloridos), no mesmo estilo da referência visual aprovada. A `PinLegend` continua abaixo da foto para reforçar a leitura dos fios (vermelho 5V, preto GND, amarelo sinal, verde I2C SDA, azul I2C SCL, laranja servo). Os caminhos e legendas vivem em `data/projectDetails.ts` (campos `wiringImage`, `wiringImageAlt`, `wiringCaption`) — adicionar uma foto nova é 1 entrada nos dados + 1 arquivo em `public/wiring/`, sem mexer em `WiringDiagram.tsx`. Ver `public/wiring/README.md` para o padrão visual.
3. **Lista de componentes** numerada + tabela de conexões (De → Para → Fio).
4. **Box de avisos** quando o projeto exige cuidados (bateria, pull-up, I2C address, etc.).
5. **Código Arduino** em `CodeBlock` (tema escuro neo-brutalista) com botões **Copiar** e **Baixar `.ino`** (gera Blob client-side).
6. **Extensões opcionais** ("para ir além") quando aplicável.
7. **Passo a passo em sala** numerado.

Dados de detalhes vivem em `data/projectDetails.ts` (mapa `projectId → ProjectDetails`). `hasProjectDetails(id)` decide entre a página completa e o fallback "em breve" (usado pelos 4 projetos novos do catálogo que ainda não têm código).

`ProjectDetails` em `features/landing/types.ts`:
* `kind: 'arduino' | 'mecanica'`
* `summary`, `warnings?`, `extensions?`
* `components: WiringComponent[]`, `connections: WiringConnection[]`
* `code`, `codeLanguage?` (`'arduino' | 'cpp'`), `inoFilename`
* `setupSteps: string[]`
* `wiringImage?` (caminho `/wiring/<id>.<ext>`), `wiringImageAlt?`, `wiringCaption?`

Se `wiringImage` não for definido, o `WiringDiagram` cai num placeholder "em desenvolvimento" — útil para projetos do catálogo que ainda não têm foto.

## 8. Animações da Navegação (TopNav)
* **Header inteiro**: `animate-fade-down` ao carregar (slideDown com opacity).
* **Logo**: `animate-logo-float` (flutuação sutil de 1.5px) + glow violeta no hover (`shadow-[0_0_18px_rgba(109,40,217,0.45)]`).
* **Ícone CPU + bolinha cyan**: `animate-glow-pulse` (pulso suave com scale 1.35).
* **Links de navegação**: traço sublinhado expande do centro para fora (`left-1/2 -translate-x-1/2`), tracking aumenta no hover, cor muda para `violet-deep`.
* **Botão Admin**: escala `scale-105` + glow shadow no hover, ícone Shield com `animate-glow-pulse`.
* **Botão "Criar Conta"**: escala `scale-105` + efeito shimmer (gradiente branco deslizante via `animate-shimmer`) + glow cyan + rotação do ícone.
* **Botões "Entrar" / "Sair"**: hover com bg mais escuro.

Definido em `tailwind.config.ts` nas chaves `keyframes`/`animation`: `fade-down`, `glow-pulse`, `logo-float`, `shimmer`.

## 9. Autenticação do Admin

* Implementação própria (não usa Supabase) em `context/AdminAuthContext.tsx`.
* Credenciais fixas em constantes no topo do arquivo: `ADMIN_USERNAME` e `ADMIN_PASSWORD`.
* Estado persistido em `localStorage` (chave `admin_auth`) — sessão sobrevive a refresh e fechamento de aba.
* Provider `AdminAuthProvider` auto-contido; cada página admin (`AdminPage`, `AdminLoginPage`) instancia o próprio provider.
* `AdminLoginPage` com formulário de nome + senha, toggle de visibilidade da senha, feedback de erro.
* Se já logado e acessar `/admin/login`, exibe mensagem "Já está logado" com link direto para o painel.
* Badge com nome do admin logado no header do painel + botão "Sair".
* TopNav link para `/admin` — se não autenticado, redireciona para `/admin/login`.

## 10. Critérios de Sucesso (Pronto para Implantação)
* Página `/` carrega em menos de 2 segundos; `/projetos` mantém a mesma performance com 8 cards.
* Totalmente responsiva — grid colapsa 4 → 2 → 1 colunas, filtros quebram em duas linhas no mobile.
* `tsc --noEmit` e `vite build` passam sem warnings.
* Adicionar um novo projeto não exige tocar em nenhum componente visual além do `ProjectIllustration` e do `data/projects.ts`.
* Adicionar/atualizar a foto de esquema de um projeto é só dropar o arquivo em `public/wiring/<projectId>.<ext>` e apontar `wiringImage` em `data/projectDetails.ts` — zero mudança no `WiringDiagram.tsx`.
* Adicionar código novo a um projeto exige apenas 1 entrada em `data/projectDetails.ts`.
* Busca e filtro por dificuldade respondem em tempo real (useMemo) sem flash de estado vazio.
* O botão "Baixar .ino" gera o arquivo no cliente (Blob) e dispara download com o filename correto.
* Admin `/admin` protegido por autenticação nome + senha (credenciais: `Claudio`/`ana@2026`).
* Projetos cadastrados via admin persistem em `localStorage` e aparecem no catálogo `/projetos` e na tabela admin.
* Upload de imagem do esquema é convertido para base64 e armazenado no `localStorage` (limite de 2 MB por imagem).
* Exclusão de projetos é reversível — projetos "excluídos" podem ser restaurados pela tabela admin.
