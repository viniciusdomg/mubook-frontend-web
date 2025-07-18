import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; // Importar Observable
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout-admin.component.html',
  // 2. Disponibilizar o serviço para este componente
  providers: [AdminService],
})
export class LayoutAdminComponent implements OnInit {
  // 3. Declarar variáveis para guardar os dados (como Observables)
  totalAdministradores$!: Observable<number>;
  totalSocios$!: Observable<number>;
  totalQuadras$!: Observable<number>;

  // 4. Injetar o AdminService no construtor
  constructor(private adminService: AdminService) {}

  // 5. Chamar os métodos do serviço quando o componente iniciar
  ngOnInit(): void {
    this.totalAdministradores$ = this.adminService.getTotalAdministradores();
    this.totalSocios$ = this.adminService.getTotalSocios();
    this.totalQuadras$ = this.adminService.getTotalQuadras();
  }
}