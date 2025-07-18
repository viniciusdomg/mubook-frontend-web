import {TipoQuadraModel} from '../quadra/tipo.quadra.model';

export interface HorarioFuncionamentoModel{
  id: number;
  diasDaSemana: string[];
  tipoQuadraId: number;
  abertura: string;
  fechamento: string;
}
