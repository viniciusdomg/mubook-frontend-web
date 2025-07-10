import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionModule} from '@angular/material/core';
import Swal from 'sweetalert2';
import {PageResponseModel} from '../../models/page.response.model';
import {QuadraRequest} from '../../models/quadra/quadra.request.model';
import {TipoQuadraModel} from '../../models/quadra/tipo.quadra.model';
import {QuadraService} from '../../services/quadra.service';
import {TipoQuadraService} from '../../services/tipo.quadra.service';
import {QuadraResponseModel} from '../../models/quadra/quadra.response.model';
import {USER_ROLES} from '../../models/gerenciar-usuarios/usuario.request.model';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-vizualizar-quadras',
  imports: [FormsModule, NgForOf, NgIf, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatOptionModule, NgClass],
  templateUrl: './vizualizar-quadras.component.html',
  styleUrl: './vizualizar-quadras.component.css'
})
export class VizualizarQuadrasComponent implements OnInit, OnDestroy {

  constructor(private service: QuadraService, private tipoService: TipoQuadraService,
              private uploadService: UploadService) {}

  request: Partial<QuadraRequest> = {
    nome: '',
    tipoQuadraId: 0,
    quantidadeMaxima: 0,
    foto_url: ''
  }

  tiposRequest: Partial<TipoQuadraModel> = {
    nome: '',
  }

  quadrasPage: PageResponseModel<QuadraResponseModel> | null = null;

  tipos: TipoQuadraModel[] = [];
  filteredTipos: any [] = [];
  tipoText: string = '';
  showAddOption = false;

  idSelecionado: number | null = null;
  selectedUserIds: number[] = [];
  tipoQuadrasPage: any | null = null;

  filters = '';
  offset = 0;
  limit = 20;

  showModal = false;

  selectedFileName: string | null = null;
  selectedFile: File | null = null;

  items: QuadraResponseModel[] = [];

  activeIndex = 0;
  private interval: any;

  ngOnInit() {
    this.loadQuadras()
    this.loadTipos();
    this.interval = setInterval(() => {
      this.goNext();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadQuadras(){
    this.service.getQuadras(this.filters, this.offset, this.limit).subscribe({
      next: data => {
        this.quadrasPage = data;
        this.items = data.content;
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao Carregar Quadras',
          text: 'Não foi possível carregar a lista de quadras.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    })
  }

  loadTipos(){
    this.tipoService.loadTipos().subscribe({
      next: data =>{
        this.tipos = data;
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar Tipos de Quadras',
          text: 'Não foi possível carregar a lista de tipos de quadras.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    })
  }

  filterQuadrasByTipo(){
    console.log("filtrar por tipo: " + this.filters);
    this.loadQuadras();
  }

  filterQuadraById() {
    console.log("filtrar por id: ", this.idSelecionado);
    if(this.idSelecionado == null){

    }
    this.service.getQuadraById(this.idSelecionado!).subscribe({
      next: data => {
        this.quadrasPage = {
          content: [data],
          totalElements: 1,
          totalPages: 1,
          size: 1,
          number: 0,
          first: true,
          last: true,
          empty: false,
        };
        this.items = [];
        this.items.push(data);
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao Buscar Quadra',
          text: 'Não foi possível buscar quadra por esse id.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    })
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
            this.selectedUserIds = this.selectedUserIds.filter(i => i !== id);
            this.loadQuadras();
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.request.foto_url = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  createQuadra() {
    if (!this.selectedFileName) {
      void Swal.fire({
        icon: 'warning',
        title: 'Imagem obrigatória',
        text: 'Por favor, selecione uma imagem da quadra.'
      });
      return;
    }

    this.uploadService.uploadFile(this.selectedFile!).subscribe({
      next: (url) => {
        this.request.foto_url = url;

        this.service.create(this.request).subscribe({
          next: res => {
            void Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: res && true ? res : 'Quadra cadastrada com sucesso!',
              timer: 2000,
              timerProgressBar: true,
            });
            this.loadQuadras();
            this.loadTipos();
            this.closeModal();
          },
          error: err => {
            void Swal.fire({
              icon: 'error',
              title: 'Erro ao Cadastrar Quadra',
              text: 'Não foi possível cadastrar a quadra.',
              footer: err?.message ? `<small>${err.message}</small>` : ''
            });
          }
        });
      },
      error: (err) => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao enviar imagem',
          text: err?.message ?? 'Não foi possível fazer upload.'
        });
      }
    });
  }

  onInput(value: string) {
    if (!value) {
      this.filteredTipos = this.tipos;
      this.showAddOption = false;
      return;
    }

    const filterValue = value.toLowerCase().trim();
    this.filteredTipos = this.tipos.filter(tipo =>
      tipo.nome.toLowerCase().includes(filterValue)
    );

    this.showAddOption = filterValue.length > 0 &&
      !this.tipos.some(tipo => tipo.nome.toLowerCase() === filterValue);
  }

  selectTipo(tipo: TipoQuadraModel) {
    this.tipoText = tipo.nome;
    this.request.tipoQuadraId = tipo.id;
    this.filteredTipos = [];
    this.showAddOption = false;
  }

  createTipoQuadra(){
    this.tiposRequest.nome = this.tipoText.trim()
    this.tipoService.create(this.tiposRequest).subscribe({
      next: res => {
        void Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: res && true ? res : 'Tipo de quadra cadastrado com sucesso!',
          timer: 2000,
          timerProgressBar: true,
        });
        this.loadTipos();
        this.closeModal();
        this.openModalUpdate();
      },
      error: err => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao Cadastrar Tipo de Quadra',
          text: 'Não foi possível cadastrar o tipo de quadra.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    })
  }

  openModalCreate() {
    this.request = {
      id: 0,
      nome: '',
      tipoQuadraId: 0,
      quantidadeMaxima: 0,
      foto_url: ''
    };
    this.showModal = true;
  }

  openModalUpdate() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  setActive(index: number) {
    this.activeIndex = (index + this.items.length) % this.items.length;
  }

  goPrev() {
    this.setActive(this.activeIndex - 1);
  }

  goNext() {
    this.setActive(this.activeIndex + 1);
  }

  prevIndex(): number {
    return (this.activeIndex - 1 + this.items.length) % this.items.length;
  }

  nextIndex(): number {
    return (this.activeIndex + 1) % this.items.length;
  }

  nextPage() {
    this.offset += this.limit;
    this.loadQuadras();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadQuadras();
    }
  }

  protected readonly length = length;
  protected readonly USER_ROLES = USER_ROLES;
}
