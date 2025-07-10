import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {PageResponseModel} from '../../models/page.response.model';
import {QuadraRequest} from '../../models/quadra/quadra.request.model';
import {TipoQuadraModel} from '../../models/quadra/tipo.quadra.model';
import {QuadraService} from '../../services/quadra.service';
import {TipoQuadraService} from '../../services/tipo.quadra.service';
import Swal from 'sweetalert2';
import {QuadraResponseModel} from '../../models/quadra/quadra.response.model';
import {USER_ROLES} from '../../models/gerenciar-usuarios/usuario.request.model';

@Component({
  selector: 'app-vizualizar-quadras',
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './vizualizar-quadras.component.html',
  styleUrl: './vizualizar-quadras.component.css'
})
export class VizualizarQuadrasComponent implements OnInit, OnDestroy {

  constructor(private service: QuadraService, private tipoService: TipoQuadraService) {}

  request: QuadraRequest = {
    id: 0,
    nome: '',
    quantidadeMaxima: 0,
    tipoQuadra: 0,
    foto_url: ''
  }

  tiposRequest: TipoQuadraModel = {
    id: 0,
    nome: '',
  }

  quadrasPage: PageResponseModel<QuadraResponseModel> | null = null;

  tipos: TipoQuadraModel[] = [];

  idSelecionado: number | null = null;
  selectedUserIds: number[] = [];
  tipoQuadrasPage: any | null = null;

  filters = '';
  offset = 0;
  limit = 20;

  showModal = false;

  selectedFileName: string | null = null;
  selectedFile: File | null = null;

  items = [
    {
      capMaxima: 20,
      tipo: 'Futsal',
      tamanho: '40x20 m',
      imagem: 'imagem-quadra.png'
    },
    {
      capMaxima: 10,
      tipo: 'Vôlei',
      tamanho: '18x9 m',
      imagem: 'imagem-quadra.png'
    },
    {
      capMaxima: 15,
      tipo: 'Basquete',
      tamanho: '28x15 m',
      imagem: 'imagem-quadra.png'
    },
    {
      capMaxima: 4,
      tipo: 'Tênis',
      tamanho: '23.77x8.23 m',
      imagem: 'imagem-quadra.png'
    },
    {
      capMaxima: 12,
      tipo: 'Areia',
      tamanho: '16x8 m',
      imagem: 'imagem-quadra.png'
    }
  ];

  activeIndex = 0;
  // private interval: any;

  ngOnInit() {
    this.loadQuadras()
    this.loadTipos();
    // this.interval = setInterval(() => {
    //   this.goNext();
    // }, 5000);
  }

  ngOnDestroy() {
    // clearInterval(this.interval);
  }

  loadQuadras(){
    this.service.getQuadras(this.filters, this.offset, this.limit).subscribe({
      next: data => {
        this.quadrasPage = data;
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
        };
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

  selectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    if (checked && this.quadrasPage?.content) {
      this.selectedUserIds = this.quadrasPage.content.map(u => u.id);
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

    this.request.foto_url = this.selectedFileName!;

    this.service.create(this.request).subscribe({
      next: res => {
        void Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: res && true ? res : 'Quadra cadastrado com sucesso!',
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
          text: 'Não foi possível cadastrar quadra.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
      }
    });
  }

  createTipoQuadra(){
    this.tipoService.create(this.tiposRequest).subscribe({
      next: res => {
        void Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: res && true ? res : 'Tipo de quadra cadastrado com sucesso!',
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
      tipoQuadra: 0,
      quantidadeMaxima: 0,
      foto_url: ''
    };
    this.showModal = true;
  }

  openModalUpdate() {
    this.request = {
      id: 0,
      nome: '',
      tipoQuadra: 0,
      quantidadeMaxima: 0,
      foto_url: ''
    };
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
