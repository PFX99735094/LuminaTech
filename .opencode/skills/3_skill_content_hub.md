# Skill: Banco de Projetos e Tutoriais

## 1. Objetivo
Armazenar e exibir de forma organizada os projetos de robótica, circuitos, códigos Arduino e roteiros de aula. A vitrine pública e o catálogo completo permitem que professores encontrem, filtrem e explorem projetos antes de qualquer cadastro. A página de detalhes entrega o esquema de ligação, código copiável/downloadable, lista de componentes e passo a passo.

## 2. Funcionalidades Implementadas

### 2.1 Vitrine na Home (LandingPage)
* Grid responsivo 1 → 2 → 3 colunas no desktop (`sm:grid-cols-2 lg:grid-cols-3`) com até 4 cards em destaque.
* Cards em pé (`aspect-[4/5]`) com imagem, badge de dificuldade, descrição, duração e CTA.
* Ordenação por dificuldade (Iniciante → Avançado).
* CTA "Ver todos os N projetos" que navega para `/projetos`.

### 2.2 Catálogo Completo (`/projetos`)
* Grid 1 → 2 → 3 colunas no desktop (`sm:grid-cols-2 lg:grid-cols-3`) com todos os projetos (originais + criados via admin).
* **Barra de busca textual** — filtra por título, área BNCC e materiais.
* **Filtro de dificuldade** — pílulas "Todos / Iniciante / Intermediário / Avançado" com estado ativo (violet-deep + sombra cyan).
* Contagem dinâmica de resultados.
* Estado vazio com CTA "Limpar filtros".
* Header e footer próprios.

### 2.3 Página de Detalhes (`/projetos/:id`)
* **Hero do projeto**: título, badge de dificuldade, duração, áreas BNCC, resumo.
* **Esquema de ligação** (foto real da montagem) — componente `WiringDiagram` busca a imagem em `public/wiring/<id>.<ext>`. Se não houver foto, exibe placeholder "em desenvolvimento". Legendas de cores dos fios abaixo.
* **Lista de componentes**: tabela numerada.
* **Conexões**: tabela "De → Para → Cor do Fio".
* **Box de avisos** (opcional, exibido apenas quando há cuidados como bateria ou pull-up).
* **Código Arduino**: `CodeBlock` com tema escuro neo-brutalista, botões **Copiar** (clipboard API) e **Baixar `.ino`** (Blob client-side com nome correto do arquivo).
* **Extensões opcionais** "para ir além" (opcional).
* **Passo a passo em sala**: etapas numeradas.
* **Habilidades BNCC**: chips por área, código em destaque, link para `/bncc`.
* Fallback "Em breve" para projetos sem detalhes cadastrados.

### 2.4 Alinhamento BNCC (`/bncc`)
* Mapeamento completo das 9 áreas (Matemática, Ciências, Física, Geografia, Língua Portuguesa, Artes, História, Tecnologia, Robótica).
* Filtro por área, busca textual por código (ex: EF67CI01).
* Lista de habilidades por área com código, título, descrição e projetos relacionados.
* Ícone por área mapeado em `bnccAreas.ts`.

### 2.5 Projetos do Admin
* Projetos cadastrados via admin (`/admin`, aba "Cadastrar Projeto") persistem em `localStorage` (chave `admin_projects`).
* Aparecem automaticamente no catálogo `/projetos` e na tabela admin.
* Suportam upload de imagem do esquema (base64, máx 2 MB).
* Exclusão reversível via `hidden_project_ids` no `localStorage`.

## 3. Filtros e Busca
| Filtro | Local | Comportamento |
|---|---|---|
| Busca textual | `/projetos` | Match por título, área BNCC e materiais (case-insensitive) |
| Dificuldade | `/projetos` | Pílulas: Todos / Iniciante / Intermediário / Avançado |
| Área BNCC | `/bncc` | Clique no card da área; busca textual por código EF |
| Projetos do admin | Tabela admin | Filtro por dificuldade + busca textual |

## 4. Dados
* Projetos originais: `src/features/landing/data/projects.ts` (array `allProjects`).
* Detalhes dos projetos: `src/features/landing/data/projectDetails.ts` (mapa `projectId → ProjectDetails`).
* Áreas BNCC: `src/features/landing/data/bnccAreas.ts` (`bnccPillars` + `bnccCompetencies`).
* Projetos do admin: `localStorage` chave `admin_projects`.
* Exclusões: `localStorage` chave `hidden_project_ids`.
* Função `hasProjectDetails(id)` decide se o projeto tem página completa ou fallback "em breve".
* Projetos admin sempre têm página completa (usam os dados do formulário de cadastro).

## 5. Componentes Principais
| Componente | Caminho | Função |
|---|---|---|
| `ProjectCard` | `features/landing/components/ProjectCard.tsx` | Card vertical (aspect-[4/5]) com imagem, badge de dificuldade, descrição, duração e botão com accent dinâmico |
| `ProjectShowcase` | `features/landing/components/ProjectShowcase.tsx` | Vitrine de 4 projetos na home |
| `WiringDiagram` | `features/landing/components/WiringDiagram.tsx` | Foto do esquema + legenda de fios |
| `CodeBlock` | `features/landing/components/CodeBlock.tsx` | Bloco de código com copiar/baixar |
| `PinLegend` | `features/landing/components/PinLegend.tsx` | Legenda de cores dos jumpers |
| `BnccAlignment` | `features/landing/components/BnccAlignment.tsx` | Cards das 9 áreas na home |
| `CadastroProjeto` | `features/admin/components/CadastroProjeto.tsx` | Formulário de novo projeto (admin) |
| `ListaProjetos` | `features/admin/components/ListaProjetos.tsx` | Tabela admin com delete/restore |

## 6. Estrutura de Dados
### `Project` (originais em `projects.ts` + admin em `localStorage`)
```ts
{
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  materials: string[];
  bncc: BnccArea[];
  bnccCode: string;
  illustration: IllustrationKey;
  accent: AccentKey;
  cardImageUrl?: string;    // imagem de capa (fallback Unsplash se ausente)
  cardImageAlt?: string;
}
```

### `ProjectDetails` (em `projectDetails.ts`)
```ts
{
  kind: 'arduino' | 'mecanica';
  summary: string;
  warnings?: string[];
  extensions?: string;
  components: WiringComponent[];
  connections: WiringConnection[];
  code: string;
  codeLanguage?: 'arduino' | 'cpp';
  inoFilename: string;
  setupSteps: string[];
  wiringImage?: string;      // caminho em /wiring/<id>.<ext>
  wiringImageAlt?: string;
  wiringCaption?: string;
}
```

### `ProjetoForm` (admin, armazenado em `localStorage`)
* Mesmos campos de `Project` + `ProjectDetails`
* `wiringImage: string` — data URL base64
* Persistido em `localStorage` (chave `admin_projects`)

## 7. Critérios de Sucesso
* Busca e filtro respondem em tempo real (useMemo) sem flash de estado vazio.
* Código copiável e baixável (.ino) sem dependência de servidor.
* `tsc --noEmit` e `vite build` passam sem warnings.
* Adicionar projeto novo = 1 entrada em `data/projects.ts` + 1 caso no `ProjectIllustration` (originais) ou formulário admin.
* Adicionar foto de esquema = 1 arquivo em `public/wiring/` + 1 campo em `data/projectDetails.ts`.
* Catálogo funciona sem backend — dados admin em `localStorage`.
