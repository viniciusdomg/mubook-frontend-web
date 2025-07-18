import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../services/reserva.service';

interface Reserva {
  id?: number;
  quadra: string;
  data: string; // formato: 'dd/MM'
  horario: string; // exemplo: '18h - 19h'
  convidados: number;
}

@Component({
  selector: 'app-layout-socio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout-socio.component.html',
  styleUrls: ['./layout-socio.component.css'],
})
export class LayoutSocioComponent implements OnInit {
  reservas: Reserva[] = [];
  totalReservasMes: number = 0;

  constructor(private reservaService: ReservaService) {}

   ngOnInit(): void {
    this.listarReservas();
    this.buscarTotalReservasMes();
  }

  listarReservas(): void {
    this.reservas = [
      {
        id: 1,
        quadra: 'Quadra de Tênis',
        data: '05/04',
        horario: '18h - 19h',
        convidados: 1,
      },
      {
        id: 2,
        quadra: 'Quadra de Tênis',
        data: '06/04',
        horario: '18h - 19h',
        convidados: 3,
      },
    ];
  }

   buscarTotalReservasMes(): void {
    this.reservaService.getTotalReservasMes().subscribe({
      next: (total: number) => this.totalReservasMes = total,
      error: () => this.totalReservasMes = 0
    });
  }

  cancelarReserva(id: number): void {
    this.reservas = this.reservas.filter(r => r.id !== id);
  }

  irAnterior(): void {
    // lógica futura
  }

  irProximo(): void {
    // lógica futura
  }
}
