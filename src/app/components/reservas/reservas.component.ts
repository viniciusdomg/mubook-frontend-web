import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  quadraSelecionada: string = '';
  dataSelecionada: string = '';
  convidados: number | null = null;
  dataMinima: string = '';

  horaSelecionada: string = '';
  horasDisponiveis: string[] =[]

  items2 = [
    { nome: 'Reserva 1', quadra: 'Futsal', data: '05-07-2025', hora: '18:00', convidados: 10 },
    { nome: 'Reserva 2', quadra: 'Vôlei', data: '06-07-2025', hora: '20:00', convidados: 8 },
    { nome: 'Reserva 3', quadra: 'Basquete', data: '07-07-2025', hora: '19:00', convidados: 12 },
    { nome: 'Reserva 4', quadra: 'Tênis', data: '08-07-2025', hora: '16:00', convidados: 4 },
    { nome: 'Reserva 5', quadra: 'Areia', data: '09-07-2025', hora: '17:00', convidados: 6 }
  ];

  activeIndex2 = 0;

  ngOnInit() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    this.dataMinima = `${ano}-${mes}-${dia}`;

    setInterval(() => {
      this.goNext2();
    }, 5000);
  }

  setActive2(index: number) {
    this.activeIndex2 = (index + this.items2.length) % this.items2.length;
  }

  goPrev2() {
    this.setActive2(this.activeIndex2 - 1);
  }

  goNext2() {
    this.setActive2(this.activeIndex2 + 1);
  }

  prevIndex2(): number {
    return (this.activeIndex2 - 1 + this.items2.length) % this.items2.length;
  }

  nextIndex2(): number {
    return (this.activeIndex2 + 1) % this.items2.length;
  }

  isAtiva(reserva: any): boolean {
  const hoje = new Date();
  const dataReserva = new Date(reserva.data.split('-').reverse().join('-') + 'T' + reserva.hora);
  return dataReserva >= hoje;
}

}
