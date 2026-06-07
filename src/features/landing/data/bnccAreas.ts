import type { BnccCompetency, BnccPillar } from '../types';

export const bnccPillars: BnccPillar[] = [
  {
    area: 'Matemática',
    code: 'MAT',
    icon: 'Calculator',
    accent: 'cyan',
    title: 'Pensamento computacional',
    description:
      'Grandezas, medidas, lógica condicional e resolução de problemas ganham sentido quando o aluno vê o código rodando.',
    competencies: [
      'EF06MA12 — Grandezas e medidas',
      'EF07MA12 — Probabilidade e estatística',
      'EF08MA05 — Proporcionalidade',
    ],
  },
  {
    area: 'Ciências',
    code: 'CIÊ',
    icon: 'Beaker',
    accent: 'lime',
    title: 'Tecnologia e sociedade',
    description:
      'Cada projeto vem com um debate guiado: para que serve? quem se beneficia? quais os riscos ambientais?',
    competencies: [
      'EF06CI03 — Matéria e energia',
      'EF07CI08 — Ecossistemas',
      'EF09CI04 — Impactos ambientais',
    ],
  },
  {
    area: 'Física',
    code: 'FIS',
    icon: 'Sigma',
    accent: 'violet',
    title: 'Movimento, força e energia',
    description:
      'Da eletricidade básica à mecânica dos fluidos: o aluno toca no conceito antes de vê-lo no quadro.',
    competencies: [
      'EF08CI02 — Força e movimento',
      'EF09CI04 — Circuitos elétricos',
    ],
  },
  {
    area: 'Geografia',
    code: 'GEO',
    icon: 'Globe2',
    accent: 'teal',
    title: 'Território, clima e sustentabilidade',
    description:
      'Sensores de campo, coleta de dados ambientais e leitura de mapas: a robótica aproxima o aluno do lugar onde vive.',
    competencies: [
      'EF06GE04 — Paisagem e sociedade',
      'EF07GE05 — Biodiversidade e clima',
    ],
  },
  {
    area: 'Língua Portuguesa',
    code: 'LP',
    icon: 'BookOpen',
    accent: 'fuchsia',
    title: 'Comunicação técnica e narrativa',
    description:
      'O aluno registra o que construiu em diário de bordo, apresenta o pitch final e argumenta decisões de projeto.',
    competencies: [
      'EF69LP12 — Relato de experimentos',
      'EF69LP26 — Argumentação oral',
    ],
  },
  {
    area: 'Artes',
    code: 'ART',
    icon: 'Palette',
    accent: 'orange',
    title: 'Design, estética e prototipagem',
    description:
      'Da escolha de cores dos LEDs à maquete final: a robótica é também uma aula de design consciente.',
    competencies: [
      'EF69AR13 — Materiais e processos',
      'EF69AR35 — Arte e tecnologia',
    ],
  },
  {
    area: 'História',
    code: 'HIS',
    icon: 'Landmark',
    accent: 'rose',
    title: 'Tecnologia ao longo do tempo',
    description:
      'Das engrenagens ao Arduino: a turma reconstrói a linha do tempo das invenções e discute quem faz tecnologia.',
    competencies: [
      'EF08HI04 — Revoluções industriais',
      'EF09HI07 — Tecnologia e vida urbana',
    ],
  },
  {
    area: 'Tecnologia',
    code: 'TEC',
    icon: 'Wrench',
    accent: 'amber',
    title: 'Cultura maker e ferramentas digitais',
    description:
      'Corte de peças, fiação, solda, impressão 3D: o aluno domina o ciclo fazer–testar–consertar característico do maker.',
    competencies: [
      'EF06TE01 — Projetos e protótipos',
      'EF07TE02 — Cultura maker',
    ],
  },
  {
    area: 'Robótica',
    code: 'ROB',
    icon: 'Bot',
    accent: 'cyan',
    title: 'Pensamento computacional aplicado',
    description:
      'A disciplina integradora: o aluno vive a BNCC na prática, programando sensores, motores e fluxos que respondem ao mundo real.',
    competencies: [
      'EF06ROB01 — Algoritmos e sequência',
      'EF07ROB02 — Sensores e atuadores',
      'EF08ROB03 — Laços de repetição e condicionais',
      'EF09ROB04 — Integração de sistemas',
    ],
  },
];

export const bnccCompetencies: Record<string, BnccCompetency> = {
  'EF06MA12': {
    code: 'EF06MA12',
    area: 'Matemática',
    title: 'Grandezas e medidas',
    description:
      'Resolver problemas que envolvam grandezas como comprimento, massa, tempo e temperatura — com unidades do SI.',
  },
  'EF07MA12': {
    code: 'EF07MA12',
    area: 'Matemática',
    title: 'Probabilidade e estatística',
    description:
      'Calcular probabilidade e construir gráficos de frequência a partir de dados coletados pelo próprio aluno.',
  },
  'EF08MA05': {
    code: 'EF08MA05',
    area: 'Matemática',
    title: 'Proporcionalidade',
    description:
      'Reconhecer e utilizar razão e proporção em situações reais, incluindo velocidade, escala e densidade.',
  },
  'EF06CI03': {
    code: 'EF06CI03',
    area: 'Ciências',
    title: 'Matéria e energia',
    description:
      'Identificar formas de energia (elétrica, térmica, luminosa) e suas transformações em circuitos simples.',
  },
  'EF07CI08': {
    code: 'EF07CI08',
    area: 'Ciências',
    title: 'Ecossistemas e biodiversidade',
    description:
      'Caracterizar ecossistemas e discutir ações que afetam a biodiversidade a partir de dados locais.',
  },
  'EF09CI04': {
    code: 'EF09CI04',
    area: 'Ciências',
    title: 'Impactos ambientais',
    description:
      'Analisar impactos socioambientais de tecnologias e propor soluções com base em evidências.',
  },
  'EF08CI02': {
    code: 'EF08CI02',
    area: 'Física',
    title: 'Força e movimento',
    description:
      'Compreender movimento, inércia e ação–reação em situações do cotidiano e em protótipos.',
  },
  'EF06GE04': {
    code: 'EF06GE04',
    area: 'Geografia',
    title: 'Paisagem e sociedade',
    description:
      'Analisar transformações na paisagem provocadas por atividade humana e seus desdobramentos locais.',
  },
  'EF07GE05': {
    code: 'EF07GE05',
    area: 'Geografia',
    title: 'Biodiversidade e clima',
    description:
      'Relacionar clima, vegetação e biodiversidade a partir de dados coletados em campo.',
  },
  'EF69LP12': {
    code: 'EF69LP12',
    area: 'Língua Portuguesa',
    title: 'Relato de experimentos',
    description:
      'Produzir relatos de experimentos com linguagem clara, sequencial e objetiva.',
  },
  'EF69LP26': {
    code: 'EF69LP26',
    area: 'Língua Portuguesa',
    title: 'Argumentação oral',
    description:
      'Apresentar ideias com argumentos consistentes, contra-argumentos e conclusão.',
  },
  'EF69AR13': {
    code: 'EF69AR13',
    area: 'Artes',
    title: 'Materiais e processos',
    description:
      'Experimentar materiais e técnicas para construir protótipos funcionais e expressivos.',
  },
  'EF69AR35': {
    code: 'EF69AR35',
    area: 'Artes',
    title: 'Arte e tecnologia',
    description:
      'Reconhecer relações entre arte, design e tecnologia em produtos do cotidiano.',
  },
  'EF08HI04': {
    code: 'EF08HI04',
    area: 'História',
    title: 'Revoluções industriais',
    description:
      'Contextualizar transformações tecnológicas e seu impacto social ao longo do tempo.',
  },
  'EF09HI07': {
    code: 'EF09HI07',
    area: 'História',
    title: 'Tecnologia e vida urbana',
    description:
      'Discutir como a tecnologia reconfigura relações de trabalho, mobilidade e convivência.',
  },
  'EF06TE01': {
    code: 'EF06TE01',
    area: 'Tecnologia',
    title: 'Projetos e protótipos',
    description:
      'Planejar, construir e testar protótipos que respondam a um problema identificado.',
  },
  'EF07TE02': {
    code: 'EF07TE02',
    area: 'Tecnologia',
    title: 'Cultura maker',
    description:
      'Conhecer e praticar o ciclo fazer–testar–consertar com ferramentas manuais e digitais.',
  },
  'EF06ROB01': {
    code: 'EF06ROB01',
    area: 'Robótica',
    title: 'Algoritmos e sequência',
    description:
      'Compreender algoritmos como sequências finitas de passos e representá-los em pseudocódigo.',
  },
  'EF07ROB02': {
    code: 'EF07ROB02',
    area: 'Robótica',
    title: 'Sensores e atuadores',
    description:
      'Identificar grandezas lidas por sensores e a resposta física de atuadores em um sistema.',
  },
  'EF08ROB03': {
    code: 'EF08ROB03',
    area: 'Robótica',
    title: 'Laços e condicionais',
    description:
      'Programar repetições e decisões em C/C++ para Arduino, lendo e interpretando o comportamento do sistema.',
  },
  'EF09ROB04': {
    code: 'EF09ROB04',
    area: 'Robótica',
    title: 'Integração de sistemas',
    description:
      'Combinar subsistemas (mecânico, eletrônico, lógico) em uma solução integrada para um problema real.',
  },
};
