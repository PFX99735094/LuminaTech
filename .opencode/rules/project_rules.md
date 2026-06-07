# Diretrizes e Regras de Desenvolvimento do Projeto

Este documento estabelece as regras de arquitetura, segurança e boas práticas para o desenvolvimento do SaaS de Robótica Educacional. Todas as Skills devem seguir rigorosamente estes padrões.

---

## 1. Stack Tecnológica Base
* **Frontend:** React (SPA) com Vite (Build Tool rápida).
* **Linguagem:** TypeScript (Tipagem estática obrigatória para evitar erros em produção).
* **Estilização:** Tailwind CSS (Para estilização rápida, responsiva e baseada em classes utilitárias).
* **Backend as a Service (BaaS):** Supabase (Autenticação, Banco de Dados PostgreSQL, Realtime e Storage para imagens).

---

## 2. Estrutura de Pastas do Frontend
O projeto deve seguir uma estrutura modular baseada em funcionalidades (features/skills) para facilitar a manutenção:

```text
src/
├── assets/          # Imagens, logotipos e ícones globais
├── components/      # Componentes globais e reutilizáveis (Botões, Inputs, Cards)
├── context/         # Contextos globais (AuthContext, ThemeContext)
├── features/        # As Skills do projeto ficam isoladas aqui
│   ├── landing/     # Skill 1: Landing page, hero, vitrine pública
│   ├── auth/        # Skill 2: Login, Cadastro, Recuperação de senha
│   ├── hub/         # Skill 3: Listagem de projetos, códigos, tutoriais
│   ├── billing/     # Skill 4: Telas de planos, histórico, checkout
│   └── community/   # Skill 5: Fórum, comentários, tópicos
├── lib/             # Configurações de clientes externos (supabaseClient.ts)
├── routes/          # Configuração de rotas (React Router)
├── types/           # Definições de tipos TypeScript globais (.d.ts)
├── App.tsx          # Componente raiz
└── main.tsx         # Ponto de entrada do Vite