import {TipoQuadraModel} from './tipo.quadra.model';

export interface QuadraResponseModel {
  id: number;
  nome: string;
  tipoQuadra: TipoQuadraModel;
  quantidadeMaxima: number;
  foto_url: string;
}
