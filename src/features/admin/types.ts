export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  school?: string;
  registeredAt: string;
  plan?: 'gratis' | 'professor' | 'escola';
}
