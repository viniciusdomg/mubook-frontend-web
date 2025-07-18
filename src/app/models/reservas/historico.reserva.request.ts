import {PerfilRequestModel} from '../perfil/perfil.request.model';

export interface HistoricoReservaRequest {
  dataHora: string;
  quadraId: number;
  convidados: Partial<PerfilRequestModel>[];
}
