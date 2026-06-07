# Feature: Landing Page e Vitrine Pública

Esta feature implementa a **Skill 1** do SaaS de Robótica Educacional: a landing page pública responsável por apresentar o produto, reter a atenção do professor da rede pública e demonstrar valor prático **antes** de exigir cadastro ou pagamento.

## Estrutura

```
src/features/landing/
├── components/
│   ├── illustrations/
│   │   └── ProjectIllustration.tsx   # SVGs customizados por projeto
│   ├── ui/                            # Reservado para componentes locais
│   ├── TopNav.tsx                     # Barra de navegação fixa
│   ├── Hero.tsx                       # Headline + blueprint animado
│   ├── ProjectShowcase.tsx            # Vitrine dos 4 projetos
│   ├── BnccAlignment.tsx              # Cards das 9 áreas BNCC na home
│   ├── CTASection.tsx                 # Plano gratuito + premium
│   └── Footer.tsx                     # Rodapé técnico
├── data/
│   ├── projects.ts                    # Dados dos projetos
│   ├── bnccAreas.ts                   # 9 áreas BNCC + 21+ habilidades (código → título + descrição)
│   └── projectDetails.ts              # Detalhes de cada projeto (código, conexões, etc.)
├── pages/
│   ├── LandingPage.tsx                # /
│   ├── ProjectsPage.tsx               # /projetos
│   ├── ProjectDetailPage.tsx          # /projetos/:id
│   └── BnccPage.tsx                   # /bncc (mapeamento completo)
├── types.ts                           # Tipagens TypeScript
└── index.ts                           # Barrel export
```

## Como usar

Importe a página direto na sua rota pública (ex.: raiz `/`):

```tsx
import { LandingPage } from '@/features/landing';

export default function Home() {
  return <LandingPage />;
}
```

## Design System — "Neural Cockpit"

Paleta fria (azul-noite) com acentos elétricos para evocar IA/robótica.

| Token            | Valor        | Uso                                |
| ---------------- | ------------ | ---------------------------------- |
| `ink-900`        | `#070B14`    | Texto, botões principais, header — base navy-black  |
| `ink-800`        | `#0E1424`    | Sombras deslocadas, gradientes    |
| `ink-700`        | `#161D2F`    | PCB dos SVGs, gradientes           |
| `paper-50`       | `#F2F4F8`    | Fundo principal — off-white frio   |
| `paper-100`      | `#E5E8EF`    | Fundo alternativo                  |
| `cyan-spark`     | `#22D3EE`    | **Cor primária da marca** — CTA, itálico de impacto, brand mark, hover |
| `cyan-deep`      | `#0E7490`    | Sombra da CTA, links               |
| `violet-spark`   | `#A78BFA`    | Acento neural                      |
| `violet-deep`    | `#6D28D9`    | Chip secundário                    |
| `fuchsia-spark`  | `#E879F9`    | Holograma, destaque raro           |
| `fuchsia-deep`   | `#A21CAF`    | Chip secundário                    |
| `lime-spark`     | `#A3E635`    | LED, sinal, OK, sucesso            |
| `lime-deep`      | `#4D7C0F`    | Label ativo                        |
| `teal-spark`     | `#2DD4BF`    | Data flow                          |
| `teal-deep`      | `#0F766E`    | Referência                         |
| `orange-spark`   | `#FB923C`    | Energia, robótica                  |
| `orange-deep`    | `#C2410C`    | Alerta quente                      |
| `amber-glow`     | `#FBBF24`    | Sticker, badge, "tape label" neo-brutalista |
| `amber-deep`     | `#B45309`    | Sombra do sticker                  |
| `rose-pulse`     | `#FB7185`    | Alerta suave                       |
| `rose-deep`      | `#BE123C`    | Box de aviso, alerta forte         |

Cada acento segue o par `spark` (claro, fundo de chip) + `deep` (escuro, texto sobre spark). Os 8 acentos suportam até 8 cards distintos na vitrine sem repetição.

| Fonte         | Estilo                       | Uso                          |
| ------------- | ---------------------------- | ---------------------------- |
| `font-display` | **Fraunces** (serif itálica) | Headlines, números, marcas  |
| `font-body`    | **DM Sans**                 | Parágrafos, listas           |
| `font-mono`    | **JetBrains Mono**          | Labels, metadados, anotações |

## Critérios de Sucesso (mapeados)

- [x] **Apresentação de Valor** — Headline focada em dor: "Robótica real na sala de aula, sem complicar o planejamento."
- [x] **Carrossel/Vitrine de 4 Projetos** — Lixeira Inteligente, Carrinho Robô, Braço Hidráulico, Estação Meteorológica. Botão "Ver Código" → `/login`.
- [x] **Seção BNCC** — 9 áreas (Matemática, Ciências, Física, Geografia, Língua Portuguesa, Artes, História, Tecnologia, **Robótica**) com página dedicada `/bncc` (busca por código + filtro por área) e seção "Habilidades BNCC" em cada projeto.
- [x] **CTA principal** — "Criar Conta Grátis" e "Conhecer Planos" com contraste forte.
- [x] **Responsivo** — Grid de projetos colapsa de 4 → 2 → 1 colunas. Hero reorganiza em mobile.
- [x] **Performance** — Sem JS de terceiros além de ícones. SVGs inline, animações em CSS puro.
- [x] **Tema "Neural Cockpit"** — Base navy-black fria + acentos elétricos (cyan como brand) para expressar robótica/IA.

## Próximos passos sugeridos

1. Adicionar animações de scroll (Framer Motion ou IntersectionObserver) para revelar seções.
2. Conectar o botão "Criar Conta Grátis" à rota da Skill 2 (`/features/auth`).
3. Substituir SVGs das ilustrações por fotos reais dos projetos (Storage do Supabase).
4. Adicionar meta-tags Open Graph para compartilhamento em redes sociais.
