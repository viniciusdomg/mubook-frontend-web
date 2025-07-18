import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Reserva {
  id?: number;
  nome: string;
  quadra: string;
  data: string;
  horario: string;
  repetirSemanalmente: boolean;
}

@Component({
  selector: 'app-layout-socio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './layout-socio.component.html',
})
export class LayoutSocioComponent implements OnInit {
  reservas: Reserva[] = [];
  novaReserva: Reserva = {
    nome: '',
    quadra: '',
    data: '',
    horario: '',
    repetirSemanalmente: false,
  };
  private proximoId = 1;

  ngOnInit(): void {
    this.listarReservas();
  }

  listarReservas(): void {
  this.reservas = [
    {
      id: 1,
      nome: 'João',
      quadra: 'Quadra 1',
      data: '2025-07-20',
      horario: '10:00',
      repetirSemanalmente: false,
    },
    {
      id: 2,
      nome: 'Maria',
      quadra: 'Quadra 2',
      data: '2025-07-21',
      horario: '14:00',
      repetirSemanalmente: true,
    },
    {
      id: 3,
      nome: 'Carlos',
      quadra: 'Quadra 1',
      data: '2025-07-22',
      horario: '09:00',
      repetirSemanalmente: false,
    },
    {
      id: 4,
      nome: 'Fernanda',
      quadra: 'Quadra 3',
      data: '2025-07-23',
      horario: '18:30',
      repetirSemanalmente: true,
    },
    {
      id: 5,
      nome: 'Lucas',
      quadra: 'Quadra 2',
      data: '2025-07-24',
      horario: '16:00',
      repetirSemanalmente: false,
    },
  ];
  this.proximoId = this.reservas.length + 1;
}


  salvarReserva(): void {
    const nova = { ...this.novaReserva, id: this.proximoId++ };
    this.reservas.push(nova);
    this.novaReserva = {
      nome: '',
      quadra: '',
      data: '',
      horario: '',
      repetirSemanalmente: false,
    };
  }

  excluirReserva(id: number): void {
    this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
  }
}
