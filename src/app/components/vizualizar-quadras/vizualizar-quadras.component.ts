import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {filter} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-vizualizar-quadras',
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './vizualizar-quadras.component.html',
  styleUrl: './vizualizar-quadras.component.css'
})
export class VizualizarQuadrasComponent implements OnInit, OnDestroy {
  quadraSelecionada: string = '';

  idSelecionado: number | null = null;
  selectedUserIds: number[] = [];
  tipoQuadrasPage: any | null = null;

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
  private interval: any;

  ngOnInit() {
    // this.interval = setInterval(() => {
    //   this.goNext();
    // }, 5000);
  }

  ngOnDestroy() {
    // clearInterval(this.interval);
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

  filterQuadrasById() {
    console.log("filtrar por id: ", this.idSelecionado);
  }

  selectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    // if (checked && this.usuariosPage?.content) {
    //   this.selectedUserIds = this.usuariosPage.content.map(u => u.id);
    // } else {
    //   this.selectedUserIds = [];
    // }
  }

  toggleSelection(id: number) {
    if (this.selectedUserIds.includes(id)) {
      this.selectedUserIds = this.selectedUserIds.filter(i => i !== id);
    } else {
      this.selectedUserIds.push(id);
    }
  }

  deleteOne(id: number) {
    console.log("deletar: ", id);
  }

  protected readonly filter = filter;
}
