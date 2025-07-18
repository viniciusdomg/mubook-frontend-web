import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { PerfilService } from '../../services/perfil.service';
import { NgIf } from '@angular/common';
import { PerfilRequestModel } from '../../models/perfil/perfil.request.model';
import {
  trigger, state, style, transition, animate
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
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
export class HeaderComponent implements OnInit {
  dropdownAtivo = false;
  nome: string = 'Usuário';
  role: string = 'Função';

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Buscar nome do usuário
    this.perfilService.getDados().subscribe({
      next: (dados: PerfilRequestModel) => {
        this.nome = dados.nome;
      },
      error: () => {
        this.nome = 'Usuário';
      }
    });

    // Buscar role do usuário
    this.authService.getUserRole().subscribe({
      next: (role: string) => {
        this.role = role.replace('ROLE_', '');
      },
      error: () => {
        this.role = 'Função';
      }
    });
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownAtivo = !this.dropdownAtivo;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.dropdownAtivo = false;
  }

  logout() {
    this.authService.logout();
  }

  irParaPerfil(event: Event) {
    event.preventDefault(); // impede o comportamento padrão do link
    this.dropdownAtivo = false; // fecha o dropdown
    void this.router.navigate(['/perfil']);
  }
}
