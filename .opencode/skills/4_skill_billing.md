# Skill: Monetização e Paywall (Bloqueio)

## 1. Objetivo
Gerenciar a barreira de pagamento (Paywall) e processar as assinaturas mensais ou anuais dos professores de forma automatizada.

## 2. Funcionalidades Principais
* **Página de Planos:** Exibição clara do preço (ex: assinatura mensal equivalente a um lanche) com foco nos benefícios.
* **Integração com Gateway (Stripe ou Mercado Pago):** Foco em pagamentos via **PIX** (alta conversão no Brasil) e Cartão de Crédito.
* **Gatilho de Bloqueio (Paywall):** Se um usuário `Free_User` clicar para ver o código de um projeto privado, o sistema intercepta o acesso e exibe uma tela amigável convidando-o a assinar.
* **Webhooks de Pagamento:** Sistema recebe o aviso do gateway de que o PIX foi pago e altera instantaneamente o status do usuário para `Premium_User`.
* **Painel de Assinatura:** Espaço onde o professor pode ver o histórico de cobrança ou cancelar a assinatura quando quiser.

## 3. Critérios de Sucesso (Pronto para Implantação)
* O acesso ao código é bloqueado estritamente no backend (e não apenas escondido no CSS).
* O status do usuário é atualizado automaticamente sem intervenção manual após a confirmação do pagamento.