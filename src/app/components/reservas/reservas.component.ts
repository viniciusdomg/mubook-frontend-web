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
  horaSelecionada: string = '';
  convidados: number | null = null;
  dataMinima: string = '';

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

  fazerReserva() {
    if (
      !this.quadraSelecionada ||
      !this.dataSelecionada ||
      !this.horaSelecionada ||
      this.convidados === null || this.convidados <= 0
    ) {
      alert('Por favor, preencha todos os campos, incluindo a quantidade de convidados.');
      return;
    }

    // Verifica se já existe uma reserva igual (quadra + data + hora)
    const reservaExistente = this.items2.some(
      reserva =>
        reserva.quadra === this.quadraSelecionada &&
        reserva.data === this.dataSelecionada &&
        reserva.hora === this.horaSelecionada
    );

    if (reservaExistente) {
      alert('Esta quadra já está reservada para essa data e horário. Por favor, escolha outro.');
      return;
    }

    // Adiciona nova reserva com convidados
    this.items2.push({
      nome: `Reserva ${this.items2.length + 1}`,
      quadra: this.quadraSelecionada,
      data: this.dataSelecionada,
      hora: this.horaSelecionada,
      convidados: this.convidados,
    });

    alert(
      `Reserva feita!\n\nQuadra: ${this.quadraSelecionada}\nData: ${this.dataSelecionada}\nHorário: ${this.horaSelecionada}\nConvidados: ${this.convidados}`
    );

    // Reseta os campos
    this.quadraSelecionada = '';
    this.dataSelecionada = '';
    this.horaSelecionada = '';
    this.convidados = null;
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

editarReserva(reserva: any) {
  alert('Função de edição ainda não implementada.\nReserva: ' + reserva.nome);
}

excluirReserva(reserva: any) {
  const confirmacao = confirm(`Deseja excluir a ${reserva.nome}?`);
  if (confirmacao) {
    this.items2 = this.items2.filter(r => r !== reserva);
  }
}
}
