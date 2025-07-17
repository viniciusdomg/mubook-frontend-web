import {QuadraResponseModel} from '../quadra/quadra.response.model';

export interface ReservasDisponiveisResponse{
  id:number,
  dataHora:string,
  quadra: QuadraResponseModel
}
