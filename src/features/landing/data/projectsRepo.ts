import type { Project } from '../types';
import { projects as localProjects } from './projects';

// Repositório público: agora retorna apenas os projetos locais

export async function fetchAllProjectsPublic(): Promise<Project[]> {
  // Mantemos somente os projetos locais no código, conforme solicitado
  return localProjects;
}

export async function fetchProjectByIdPublic(id: string): Promise<Project | null> {
  // Busca apenas local
  const project = localProjects.find((p) => p.id === id) ?? null;
  return project;
}
