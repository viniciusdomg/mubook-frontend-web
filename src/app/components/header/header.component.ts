import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {NgClass, NgIf} from '@angular/common';
import {
  trigger, state, style, transition, animate
} from '@angular/animations';
// import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgClass,
    NgIf,
    // RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ]),
    ]),
    trigger('rotateIcon', [
      state('open', style({ transform: 'rotate(180deg)' })),
      state('closed', style({ transform: 'rotate(0deg)' })),
      transition('open <=> closed', [
        animate('200ms ease-in-out')
      ]),
    ])
  ]
})
export class HeaderComponent {
  dropdownAtivo = false;

  constructor(private apiService: AuthService, private router: Router) {}

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownAtivo = !this.dropdownAtivo;
  }

  logout() {
    this.apiService.logout()
    void this.router.navigate(['/login']);
  }
}
