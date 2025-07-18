import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ReservasDisponiveisResponse} from '../../models/reservas/reservas.disponiveis.response';
import {ReservaService} from '../../services/reserva.service';
import {TipoQuadraService} from '../../services/tipo.quadra.service';
import Swal from 'sweetalert2';
import {TipoQuadraModel} from '../../models/quadra/tipo.quadra.model';
import {Router} from '@angular/router';
import {PageResponseModel} from '../../models/page.response.model';
import {HistoricoReservaRequest} from '../../models/reservas/historico.reserva.request';
import {HistoricoReservaResponse} from '../../models/reservas/historico.reserva.response';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  constructor(private service: ReservaService, private tipoService: TipoQuadraService,
              private router: Router) {}

  pageHistoricoReservas: PageResponseModel<HistoricoReservaResponse> | null = null;

  reservasDisponiveis: ReservasDisponiveisResponse[] = [];

  tiposQuadra: TipoQuadraModel[] = [];

  offset: number = 0;
  limit: number = 20;
  tipoQuadraSelecionada: number = 0;
  dataSelecionada: string = '';
  dataMinima: string = '';

  horaSelecionada: string = '';
  // horasDisponiveis: string[] =[]

  activeIndex = 0;

  ngOnInit() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    this.dataMinima = `${ano}-${mes}-${dia}`;

    this.loadReservasDisponiveis()
    this.loadPageHistorico()
    this.loadTipos()

  }

  loadPageHistorico(){
    this.service.pageHistoricoReservas(this.offset, this.limit, this.tipoQuadraSelecionada,this.dataSelecionada, this.horaSelecionada).subscribe({
      next: (data) => {
        this.pageHistoricoReservas = data;
        console.log(this.pageHistoricoReservas);
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar Tipos de Quadras',
          text: 'Não foi possível carregar a lista de tipos de quadras.',
          footer: err?.message ? `<small>${err.message}</small>` : '',
        });
      }
    })
  }

  loadReservasDisponiveis() {
    this.service.getReservasDisponiveis(this.tipoQuadraSelecionada,this.dataSelecionada, this.horaSelecionada)
      .subscribe({
        next: (data) => {
          this.reservasDisponiveis = data;
        },
        error: err => {
          void Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar Tipos de Quadras',
            text: 'Não foi possível carregar a lista de tipos de quadras.',
            footer: err?.message ? `<small>${err.message}</small>` : '',
          });
        }
      })
  }

  loadTipos(): void {
    this.tipoService.loadTipos().subscribe({
      next: (data) => (this.tiposQuadra = data),
      error: (err) => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar Tipos de Quadras',
          text: 'Não foi possível carregar a lista de tipos de quadras.',
          footer: err?.message ? `<small>${err.message}</small>` : '',
        });
      },
    });
  }

  cancelarReserva(id: number){
    void Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja mesmo cancelar essa reserva? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, cancelar',
      cancelButtonText: 'Desistir'
    }).then(result => {
      if(result.isConfirmed) {
        this.service.cancelarReserva(id).subscribe({
          next: data => {
            void Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Reserva cancelada com sucesso!',
              timer: 2000,
              timerProgressBar: true,
            });
            this.loadPageHistorico();
            this.loadReservasDisponiveis();
          }, error: err => {
            void Swal.fire({
              icon: 'error',
              title: 'Erro ao cancelar reserva',
              text: 'Não foi possível cancelar o reserva.',
              footer: err?.message ? `<small>${err.message}</small>` : ''
            });
          }
        })
      }
    });
  }

  agendarReserva(){
    const reserva = this.reservasDisponiveis[this.activeIndex];
    localStorage.setItem('reservaSelecionada', JSON.stringify(reserva));
    void this.router.navigate(['/agendar-reserva']);
  }

  editarReserva(id: number) {
    localStorage.setItem('modoEdicao', 'true');
    localStorage.setItem('reservaId', id.toString());
    void this.router.navigate(['/agendar-reserva']);
  }

  setActive2(index: number) {
    this.activeIndex = (index + this.reservasDisponiveis.length) % this.reservasDisponiveis.length;
  }

  goPrev2() {
    this.setActive2(this.activeIndex - 1);
  }

  goNext2() {
    this.setActive2(this.activeIndex + 1);
  }

  prevIndex2(): number {
    return (this.activeIndex - 1 + this.reservasDisponiveis.length) % this.reservasDisponiveis.length;
  }

  nextIndex2(): number {
    return (this.activeIndex + 1) % this.reservasDisponiveis.length;
  }

  isAtiva(reserva: any): boolean {
    if (!reserva?.dataHora) return false;
    const agora = new Date();
    const dataReserva = new Date(reserva.dataHora);
    return dataReserva >= agora;
  }

  extData(dataHora: string | Date): string {
    return new Date(dataHora).toLocaleDateString('pt-BR');
  }

  extHora(dataHora: string | Date): string {
    return new Date(dataHora).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }


}
