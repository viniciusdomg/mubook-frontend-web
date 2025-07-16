import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PerfilService} from '../../services/perfil.service';
import Swal from 'sweetalert2';
import {PerfilRequestModel} from '../../models/perfil/perfil.request.model';
import {UploadService} from '../../services/upload.service';
import {NgIf} from '@angular/common';
import {CepService} from "../../services/cep.service";

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  standalone: true
})
export class PerfilComponent implements OnInit{

  perfil!: PerfilRequestModel;
  carregando = false;

  selectedFileName: String | null = null;
  selectedFile: File | null = null;

  cepInvalido = false;
  carregandoCEP = false;

  constructor(private service: PerfilService, private uploadService: UploadService,
              private cepService: CepService,) {}

  ngOnInit(): void {
    this.perfil = {
      id: 0,
      foto_url: '',
      nome: '',
      email: '',
      dataNascimento: '',
      genero: '',
      cpf: '',
      cep: '',
      endereco: '',
      complemento: '',
      telefone: ''
    };

    this.carregarDadosPerfil();
  }

  carregarDadosPerfil(): void {
    this.carregando = true
    this.service.getDados().subscribe({
      next: (data) => {
        this.perfil = data;
        this.carregando = false;
      },
      error: (err) => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar perfil',
          text: 'Não foi possível carregar seus dados. Tente novamente mais tarde.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
        });
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (this.selectedFileName && this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile!).subscribe({
        next: data => {
          this.perfil.foto_url = data;
        },
        error: err => {
          void Swal.fire({
            icon: 'error',
            title: 'Erro ao salvar',
            text: 'Ocorreu um erro ao atualizar seu perfil.',
            footer: err?.message ? `<small>${err.message}</small>` : ''
          });
          return
        }
      })
    }

    const dados: PerfilRequestModel = this.perfil;

    this.service.salvar(dados).subscribe({
      next: res => {
        void Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: res && true ? res : 'Dados atualizados com sucesso!',
          timer: 2000,
          timerProgressBar: true,
        });
        this.carregarDadosPerfil();
      },
      error: (err) => {
        void Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Ocorreu um erro ao atualizar seu perfil.',
          footer: err?.message ? `<small>${err.message}</small>` : ''
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
        this.perfil.foto_url = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  buscarCEP() {
    if (this.perfil.cep.length === 8) {
      this.carregandoCEP = true;
      this.cepInvalido = false;

      this.cepService.buscarCep(this.perfil.cep)
          .then((data: any) => {
            this.carregandoCEP = false;
            this.cepInvalido = false;

            if (data) {
              this.perfil.endereco = data.logradouro;
              this.perfil.complemento = data.complemento;
            }
          })
          .catch(() => {
            this.carregandoCEP = false;
            this.cepInvalido = true;
          });
    }
  }
}
