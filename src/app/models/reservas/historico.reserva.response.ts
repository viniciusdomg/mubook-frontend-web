import {QuadraResponseModel} from '../quadra/quadra.response.model';

export interface HistoricoReservaResponse {
  id: number;
  dataHora: string;
  quadra: QuadraResponseModel;
  convidados: any[];
  status: string;
}
