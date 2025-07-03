export interface UsuarioRequestModel {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  tipo: 'socio' | 'administrador';
}
