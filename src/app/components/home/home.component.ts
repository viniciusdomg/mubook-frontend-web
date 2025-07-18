import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { LayoutAdminComponent } from '../../layout-admin/layout-admin.component';
import { LayoutSocioComponent } from '../../layout-socio/layout-socio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutSocioComponent, LayoutAdminComponent],
  template: `
    <ng-container *ngIf="role === 'ROLE_ASSOCIADO'">
      <app-layout-socio></app-layout-socio>
    </ng-container>

    <ng-container *ngIf="role === 'ROLE_ADMINISTRADOR'">
      <app-layout-admin></app-layout-admin>
    </ng-container>

    <ng-container *ngIf="!role">
      <p class="ml-[150px] text-gray-400">Carregando...</p>
    </ng-container>
  `
})
export class HomeComponent implements OnInit {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserRole().subscribe({
      next: (res) => this.role = res,
      error: () => this.role = null
    });
  }
}
