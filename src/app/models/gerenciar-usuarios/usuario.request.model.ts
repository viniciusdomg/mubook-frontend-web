export interface UsuarioRequestModel {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  tipo: string;
}

export const USER_ROLES = [
  { label: 'Administrador', value: 'ROLE_ADMINISTRADOR' },
  { label: 'Associado', value: 'ROLE_ASSOCIADO' }
];
