import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor() {}

  async buscarCep(cep: string) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        return;
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
      throw new Error('Erro ao buscar o CEP');
    }
  }
}
