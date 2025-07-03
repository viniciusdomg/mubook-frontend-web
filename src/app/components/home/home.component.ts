import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent {
   items = [1, 2, 3, 4, 5, 6];
  activeIndex = 0;

  items2 = [1, 2, 3, 4, 5, 6];
  activeIndex2 = 3;

  private interval1: any;
  private interval2: any;

  ngOnInit() {
    // A cada 5 segundos avança o primeiro carrossel
    this.interval1 = setInterval(() => {
      this.goNext();
    }, 5000);

    // A cada 5 segundos avança o segundo carrossel
    this.interval2 = setInterval(() => {
      this.goNext2();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  // Funções existentes
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

  // Segundo carrossel

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

}
