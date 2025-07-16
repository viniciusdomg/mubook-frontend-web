export interface PerfilRequestModel {
  id: number;
  foto_url: string;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: string; // formato ISO, ex.: '1993-04-21'
  genero: string;
  cep: string;
  endereco: string;
  complemento: string;
  telefone: string;
}
