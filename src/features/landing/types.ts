export type Difficulty = 'Iniciante' | 'Intermediário' | 'Avançado';

export type BnccArea =
  | 'Matemática'
  | 'Ciências'
  | 'Física'
  | 'Geografia'
  | 'Artes'
  | 'Língua Portuguesa'
  | 'História'
  | 'Tecnologia'
  | 'Robótica';

export type IllustrationKey =
  | 'lixeira'
  | 'carrinho'
  | 'braco'
  | 'sensor'
  | 'semaforo'
  | 'jardim'
  | 'piano'
  | 'casa';

export type AccentKey =
  | 'amber'
  | 'lime'
  | 'cyan'
  | 'rose'
  | 'violet'
  | 'teal'
  | 'orange'
  | 'fuchsia';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  materials: string[];
  bncc: BnccArea[];
  bnccCode: string;
  bnccCompetencies: string[];
  illustration: IllustrationKey;
  accent: AccentKey;
}

export interface WiringConnection {
  from: string;
  to: string;
  label?: string;
  color?: string;
}

export interface WiringComponent {
  id: string;
  name: string;
  description?: string;
}

export interface ProjectDetails {
  kind: 'arduino' | 'mecanica';
  summary: string;
  warnings?: string[];
  components: WiringComponent[];
  connections: WiringConnection[];
  code: string;
  codeLanguage?: 'arduino' | 'cpp';
  inoFilename: string;
  setupSteps: string[];
  extensions?: string[];
  wiringImage?: string;
  wiringImageAlt?: string;
  wiringCaption?: string;
}

export interface BnccPillar {
  area: BnccArea;
  code: string;
  title: string;
  competencies: string[];
  description: string;
  accent: AccentKey;
  icon:
    | 'Calculator'
    | 'Beaker'
    | 'Sigma'
    | 'Globe2'
    | 'Palette'
    | 'BookOpen'
    | 'Landmark'
    | 'Wrench'
    | 'Bot';
}

export interface BnccCompetency {
  code: string;
  area: BnccArea;
  title: string;
  description: string;
}
