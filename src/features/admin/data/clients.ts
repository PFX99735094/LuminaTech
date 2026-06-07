import type { Client } from '../types';

export const mockClients: Client[] = [
  {
    id: 'cli-001',
    name: 'Ana Beatriz Oliveira',
    email: 'ana.oliveira@escola.edu.br',
    phone: '(11) 98765-4321',
    registeredAt: '2026-01-15T10:30:00',
    plan: 'professor',
  },
  {
    id: 'cli-002',
    name: 'Carlos Eduardo Silva',
    email: 'carlos.silva@gmail.com',
    phone: '(21) 99876-5432',
    registeredAt: '2026-02-03T14:15:00',
    plan: 'gratis',
  },
  {
    id: 'cli-003',
    name: 'Mariana Costa Santos',
    email: 'mariana.santos@prof.educacao.gov.br',
    phone: '(31) 98712-3456',
    registeredAt: '2026-02-20T08:45:00',
    plan: 'escola',
  },
  {
    id: 'cli-004',
    name: 'EMEF Professor Amâncio',
    email: 'secretaria@emancio.edu.br',
    phone: '(19) 3721-4589',
    registeredAt: '2026-03-01T16:00:00',
    plan: 'escola',
  },
  {
    id: 'cli-005',
    name: 'Rafaela Lima Martins',
    email: 'rafaela.martins@yahoo.com',
    phone: '(41) 99901-2345',
    registeredAt: '2026-03-10T09:20:00',
    plan: 'gratis',
  },
];
