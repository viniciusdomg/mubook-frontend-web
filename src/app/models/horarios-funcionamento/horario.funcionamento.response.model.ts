import {TipoQuadraModel} from '../quadra/tipo.quadra.model';

export interface HorariosFuncionamentoResponse {
  id: number;
  tipoQuadra: TipoQuadraModel;
  diasSemana: string[];
  horarioAbertura: string;
  horarioFechamento: string;
}
