import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vizualizar-quadras',
  imports: [FormsModule],
  templateUrl: './vizualizar-quadras.component.html',
  styleUrl: './vizualizar-quadras.component.css'
})
export class VizualizarQuadrasComponent implements OnInit, OnDestroy {
  quadraSelecionada: string = '';

  // Agora com objetos estáticos
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
    this.interval = setInterval(() => {
      this.goNext();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
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
}
