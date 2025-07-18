import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth/auth.service'; // IMPORTAÇÃO DO AUTH

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserRole().subscribe({
      next: role => this.userRole = role,
      error: () => this.userRole = null
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'ROLE_ADMINISTRADOR';
  }

  isAssociado(): boolean {
    return this.userRole === 'ROLE_ASSOCIADO';
  }

  toggleSubmenu(event: Event) {
    event.preventDefault();

    const link = (event.target as HTMLElement).closest('.menu-item');
    if (link) {
      link.classList.toggle('ativo');
    }
  }
}
