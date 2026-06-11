// Repositório admin desativado: funcionalidades de salvar/atualizar/excluir foram removidas
// Mantemos os exports para não quebrar imports antigos, mas retornamos respostas neutras


// Minimal shape we need in Admin for listing
export interface AdminProjectRow {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  difficulty?: string | null;
  duration?: string | null;
  materials?: string[] | null;
  bncc?: string[] | null;
  bncc_code?: string | null;
  bnccCompetencies?: string[] | null; // tolerate camelCase if table differs
  bncc_competencies?: string[] | null;
  hidden?: boolean | null;
  created_at?: string | null;
}

// Insert full payload as-is; assume a table "admin_projects" exists with JSONB columns where needed
export async function insertAdminProject(_payload: Record<string, unknown>) {
  return { error: 'Funcionalidade desativada: projetos são mantidos apenas no código.' } as const;
}

export async function deleteAdminProject(_id: string) {
  return { error: 'Funcionalidade desativada: remoção indisponível.' } as const;
}

export async function fetchAdminProjects(): Promise<{ data: AdminProjectRow[]; error: string | null }> {
  return { data: [], error: null };
}

// Fetch a single admin project by id with all available columns
export async function fetchAdminProjectById(_id: string): Promise<{ data: Record<string, any> | null; error: string | null }> {
  return { data: null, error: 'Funcionalidade desativada.' };
}

// Update an existing admin project by id
export async function updateAdminProject(_id: string, _payload: Record<string, unknown>) {
  return { error: 'Funcionalidade desativada: atualização indisponível.' } as const;
}

export async function uploadWiringImage(_file: File, _projectId: string): Promise<{ url: string | null; error: string | null }> {
  return { url: null, error: 'Upload desativado.' };
}

export async function uploadCardImage(_file: File, _projectId: string): Promise<{ url: string | null; error: string | null }> {
  return { url: null, error: 'Upload desativado.' };
}
