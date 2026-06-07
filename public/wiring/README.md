# Fotos do esquema de ligação

Esta pasta guarda as **fotos reais** das montagens usadas na página de
detalhes de cada projeto (`/projetos/:id`).

Não usamos mais ilustração SVG estilo TinkerCAD. O componente
`WiringDiagram` renderiza um `<img>` apontando para o caminho declarado em
`src/features/landing/data/projectDetails.ts` (campo `wiringImage`).

## Arquivos esperados

| Arquivo                        | Projeto              | Componentes na foto                                                |
| ------------------------------ | -------------------- | ------------------------------------------------------------------ |
| `lixeira-inteligente.png`      | Lixeira Inteligente  | Arduino Uno, HC-SR04, Servo SG90, protoboard, jumpers coloridos.   |
| `carrinho-robo.jpg`            | Carrinho Robô        | Chassi MDF, Arduino Uno, L298N, HC-05, 2x motores DC, bateria.    |
| `braco-hidraulico.jpg`         | Braço Hidráulico     | Base de madeira, 6 seringas, mangueiras coloridas.                 |
| `sensor-umidade.jpg`           | Estação Meteorológica| Arduino Nano, DHT22, LCD 16x2 I2C, protoboard, jumpers.           |

## Padrão visual das fotos

Para manter a coerência com a identidade neo-brutalista da landing page:

- **Fundo branco liso** (sem distrações).
- **Enquadramento de cima (top-down)**, mostrando toda a protoboard e o
  Arduino juntos.
- **Jumpers coloridos visíveis** (vermelho, preto, amarelo, verde, azul,
  laranja, roxo), reforçando a `PinLegend` exibida logo abaixo.
- **Componentes com silhuetas reconhecíveis** (não é preciso close-up).
- **Resolução mínima 1200×600 px**, formato `.jpg` (qualidade 80), `.png`
  ou `.webp`. Salvar também uma versão 2× para telas retina quando possível.

## Quando um projeto novo ganhar foto

1. Tirar a foto seguindo o padrão acima.
2. Salvar em `public/wiring/<projectId>.<jpg|png|webp>`.
3. Em `src/features/landing/data/projectDetails.ts`, preencher os campos
   (use a mesma extensão do arquivo):
   ```ts
   wiringImage: '/wiring/<projectId>.<jpg|png|webp>',
   wiringImageAlt: 'Descrição acessível da foto (uma frase, em pt-BR).',
   wiringCaption: 'Legenda curta exibida logo abaixo da imagem.',
   ```

Não é necessário alterar `WiringDiagram.tsx` — o componente já consome
esses campos do `ProjectDetails`.
