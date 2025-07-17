import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HorariosFuncionamentoService } from '../../services/horarios.funcionamento.service';
import { TipoQuadraService } from '../../services/tipo.quadra.service';
import { TipoQuadraModel } from '../../models/quadra/tipo.quadra.model';
import Swal from 'sweetalert2';
import {HorarioFuncionamentoModel} from '../../models/horarios-funcionamento/horario.funcionamento.model';

@Component({
  selector: 'app-horarios-funcionamento',
  templateUrl: './horarios-funcionamento.component.html',
  styleUrl: './horarios-funcionamento.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgForOf, NgIf],
})
export class HorariosFuncionamentoComponent implements OnInit {
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
    private fb: FormBuilder,
    private service: HorariosFuncionamentoService,
    private tipoService: TipoQuadraService
  ) {}

  ngOnInit(): void {
    this.loadTipos();
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
        next: () => {
          void Swal.fire('Sucesso', 'Horário cadastrado com sucesso!', 'success');
          this.diasSelecionados = [];
          this.horario = { diasDaSemana: [], abertura: "", fechamento: "" };
        },
        error: (err) => {
          void Swal.fire('Erro', 'Falha ao cadastrar horário.', 'error');
        },
      });
    } else {
      void Swal.fire('Atenção', 'Preencha todos os campos e selecione pelo menos um dia.', 'warning');
    }
  }
}
