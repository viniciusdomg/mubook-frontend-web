import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ReservaService} from '../../services/reserva.service';
import {PerfilRequestModel} from '../../models/perfil/perfil.request.model';
import {HistoricoReservaRequest} from '../../models/reservas/historico.reserva.request';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ConvidadoResponse} from '../../models/reservas/convidado.response';

@Component({
  selector: 'app-reservas-agendar',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './reservas-agendar.component.html',
  styleUrl: './reservas-agendar.component.css'
})
export class ReservasAgendarComponent implements OnInit, OnDestroy{

  reserva: any ;

  carregando = false;
  modoEdicao = false;
  reservaId: any;

  selectedUserIds: number[] = [];

  constructor(private service: ReservaService, private router: Router) {}

  ngOnInit(): void {
    const reservaSalva = localStorage.getItem('reservaSelecionada');
    if (reservaSalva) {
       this.reserva = JSON.parse(reservaSalva);
    }

    const modoEdicaoStr = localStorage.getItem('modoEdicao');
    console.log(modoEdicaoStr);
    if(modoEdicaoStr === 'true'){
      this.modoEdicao = true;
    }

    const reservaIdStr = localStorage.getItem('reservaId');
    if (this.modoEdicao && reservaIdStr) {
      this.reservaId = Number(reservaIdStr);
      this.carregarReservaParaEdicao(this.reservaId);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('reservaSelecionada');
    localStorage.removeItem('modoEdicao');
    localStorage.removeItem('reservaId');
    localStorage.removeItem('convidados');
  }

  convidado: Partial<PerfilRequestModel> = {}

  convidados: Partial<PerfilRequestModel>[] = [];

  convidadosSalvos: ConvidadoResponse[] = [];

  requestHistorico: HistoricoReservaRequest = {
    dataHora: '',
    quadraId: 0,
    convidados: []
  };

  carregarReservaParaEdicao(id: number) {
    this.service.getHistoricoReservaId(id).subscribe({
      next: (reserva) => {
        console.log(reserva);
        this.reserva = reserva;
        this.convidadosSalvos = reserva.convidados || [];
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar reserva',
          text: 'Não foi possível carregar os dados da reserva.',
          footer: err?.message || '',
        });
      }
    });
  }

  salvarNovosConvidados() {
    this.service.addConvidado(this.convidados, this.reservaId).subscribe({
      next: () => {
        void Swal.fire({
          icon: 'success',
          title: 'Convidados adicionados com sucesso!',
          timer: 2000,
        });
        localStorage.removeItem('reservaSelecionada');
        localStorage.removeItem('convidados');
        localStorage.removeItem('modoEdicao');
        localStorage.removeItem('reservaId');
        void this.router.navigate(['/reservas']);
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível salvar os convidados',
          footer: err?.message || '',
        });
      }
    });
  }

  agendar(){
    const convidadosFinal = localStorage.getItem('convidados');
    if (!this.reserva) return;
    this.requestHistorico.dataHora = this.reserva.dataHora;
    this.requestHistorico.quadraId = this.reserva.quadra.id;
    this.requestHistorico.convidados = convidadosFinal ? JSON.parse(convidadosFinal) : [];

    this.service.agendarReserva(this.requestHistorico).subscribe({
      next: (data) => {
        void Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Reserva agendada com sucesso!',
          timer: 2000,
          timerProgressBar: true,
        });
        localStorage.removeItem('reservaSelecionada');
        localStorage.removeItem('convidados');
        void this.router.navigate(['/reservas']);
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: err?.message || 'Não foi possível agendar a reserva!',
        });
      }
    })
    console.log(this.requestHistorico);
  }

  adicionarConvidado() {
    if (!this.convidado.cpf || !this.convidado.nome || !this.convidado.email) {
      return;
    }

    this.convidados.push({ ...this.convidado });
    localStorage.setItem('convidados', JSON.stringify(this.convidados));
    this.convidado = {};
  }

  deleteLocalStorage(cpf: string){
    const convidadosStr = localStorage.getItem('convidados');
    if (!convidadosStr) return;

    const convidados = JSON.parse(convidadosStr);
    const convidadosAtualizados = convidados.filter((c: any) => c.cpf !== cpf);

    localStorage.setItem('convidados', JSON.stringify(convidadosAtualizados));
    this.convidados = convidadosAtualizados;
  }

  selectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    if (checked && this.convidadosSalvos) {
      this.selectedUserIds = this.convidadosSalvos.map(u => u.id);
    } else {
      this.selectedUserIds = [];
    }
  }

  toggleSelection(id: number) {
    if (this.selectedUserIds.includes(id)) {
      this.selectedUserIds = this.selectedUserIds.filter(i => i !== id);
    } else {
      this.selectedUserIds.push(id);
    }
  }

  deleteSelected() {
    if (this.selectedUserIds.length > 0) {
      void Swal.fire({
        title: 'Tem certeza?',
        text: 'Deseja mesmo deletar estes convidados? Esta ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, deletar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.service.deleteConvidados(this.selectedUserIds).subscribe({
            next: res => {
              void Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: res && true ? res : 'Usuários deletados com sucesso!',
                timer: 2000,
                timerProgressBar: true,
              });
              this.selectedUserIds = [];
              this.carregarReservaParaEdicao(this.reservaId);
            },
            error: err => {
              void Swal.fire({
                icon: 'error',
                title: 'Erro ao excluir usuários',
                text: 'Não foi possível excluir os usuários selecionados.',
                footer: err?.message ? `<small>${err.message}</small>` : ''
              });
            }
          });
        }
      })
    } else {
      void Swal.fire({
        icon: 'info',
        title: 'Nenhum usuário selecionado',
        text: 'Por favor, selecione ao menos um usuário para excluir.'
      });
    }
  }

  deleteOne(id: number){
    void Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja mesmo deletar este convidado? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.deleteConvidado(id).subscribe({
          next: res => {
            void Swal.fire({
              icon: 'success',
              title: 'Deletado!',
              text: res || 'O usuário foi deletado com sucesso.',
              timer: 2000,
              timerProgressBar: true
            });
            this.selectedUserIds = this.selectedUserIds.filter(i => i !== id);
            this.carregarReservaParaEdicao(this.reservaId);
          },
          error: err => {
            void Swal.fire({
              icon: 'error',
              title: 'Erro ao excluir usuário',
              text: 'Não foi possível excluir o usuário.',
              footer: err?.message ? `<small>${err.message}</small>` : ''
            });
          }
        });
      }
    });
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
