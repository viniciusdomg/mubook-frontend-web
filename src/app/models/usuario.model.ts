export interface UsuarioModel {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: 'socio' | 'administrador';
}
