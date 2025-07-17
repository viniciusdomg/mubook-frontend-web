import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { HorariosFuncionamentoService } from '../../services/horarios.funcionamento.service';
import { TipoQuadraService } from '../../services/tipo.quadra.service';
import { TipoQuadraModel } from '../../models/quadra/tipo.quadra.model';
import Swal from 'sweetalert2';
import {HorarioFuncionamentoModel} from '../../models/horarios-funcionamento/horario.funcionamento.model';
import {PageResponseModel} from '../../models/page.response.model';
import {HorariosFuncionamentoResponse} from '../../models/horarios-funcionamento/horario.funcionamento.response.model';

@Component({
  selector: 'app-horarios-funcionamento',
  templateUrl: './horarios-funcionamento.component.html',
  styleUrl: './horarios-funcionamento.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgForOf, NgIf, NgClass],
})
export class HorariosFuncionamentoComponent implements OnInit {

  horariosPage: PageResponseModel<HorariosFuncionamentoResponse> | null = null;

  offset: number = 0;
  limit: number = 20;


  diasSemana = [
    { label: 'Domingo', valor: 'SUNDAY' },
    { label: 'Segunda', valor: 'MONDAY' },
    { label: 'Terça', valor: 'TUESDAY' },
    { label: 'Quarta', valor: 'WEDNESDAY' },
    { label: 'Quinta', valor: 'THURSDAY' },
    { label: 'Sexta', valor: 'FRIDAY' },
    { label: 'Sábado', valor: 'SATURDAY' },
  ];

  diasSelecionados: string[] = [];
  tiposQuadra: TipoQuadraModel[] = [];
  horario: Partial<HorarioFuncionamentoModel> ={
    diasDaSemana: [],
    abertura: "",
    fechamento: ""
  };

  constructor(
    private service: HorariosFuncionamentoService,
    private tipoService: TipoQuadraService
  ) {}

  ngOnInit(): void {
    this.loadHorarios()
    this.loadTipos();
  }

  loadHorarios(){
    this.service.getPageHorarios(this.offset, this.limit).subscribe({
      next: (data) => (this.horariosPage = data),
      error: (err) => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar Tipos de Quadras',
          text: 'Não foi possível carregar a lista de tipos de quadras.',
          footer: err?.message ? `<small>${err.message}</small>` : '',
        });
      },
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

  onDiaChange(event: any): void {
    const dia = event.target.value;
    if (event.target.checked) {
      this.diasSelecionados.push(dia);
    } else {
      this.diasSelecionados = this.diasSelecionados.filter((d) => d !== dia);
    }
  }

  onSubmit(): void {
    if (
      this.diasSelecionados.length > 0 &&
      this.horario.tipoQuadraId &&
      this.horario.abertura &&
      this.horario.fechamento
    ) {
      this.horario.diasDaSemana = this.diasSelecionados;

      this.service.create(this.horario).subscribe({
        next: (res) => {
          void Swal.fire({title: 'Sucesso', text: res || 'Horário cadastrado com sucesso!', icon: 'success',
            timer: 2000, timerProgressBar: true});
          this.diasSelecionados = [];
          this.horario = { diasDaSemana: [], abertura: "", fechamento: "" };
        },
        error: (err) => {
          void Swal.fire({title: 'Erro', text: err || 'Falha ao cadastrar horário.', icon: 'error'});
        },
      });
    } else {
      void Swal.fire('Atenção', 'Preencha todos os campos e selecione pelo menos um dia.', 'warning');
    }
  }

  deleteOne(id: number) {
    void Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja mesmo deletar esta quadra? Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.deleteOne(id).subscribe({
          next: res => {
            void Swal.fire({
              icon: 'success',
              title: 'Deletado!',
              text: res || 'A quadra foi deletado com sucesso.',
              timer: 2000,
              timerProgressBar: true
            });
            this.loadHorarios();
          },
          error: err => {
            void Swal.fire({
              icon: 'error',
              title: 'Erro ao Excluir Quadra',
              text: 'Não foi possível excluir quadra.',
              footer: err?.message ? `<small>${err.message}</small>` : ''
            });
          }
        });
      }
    });
  }

  nextPage() {
    this.offset += this.limit;
    this.loadHorarios();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadHorarios();
    }
  }
}
