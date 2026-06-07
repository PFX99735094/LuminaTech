export { LandingPage } from './pages/LandingPage';
export { ProjectsPage } from './pages/ProjectsPage';
export { ProjectDetailPage } from './pages/ProjectDetailPage';
export { BnccPage } from './pages/BnccPage';
export { projects, bnccPillars } from './data/projects';
export { bnccPillars as bnccAreas, bnccCompetencies } from './data/bnccAreas';
export { projectDetails, hasProjectDetails } from './data/projectDetails';
export { accentMap } from './components/ProjectCard';
export type {
  Project,
  BnccPillar,
  BnccCompetency,
  Difficulty,
  BnccArea,
  IllustrationKey,
  AccentKey,
  ProjectDetails,
} from './types';
