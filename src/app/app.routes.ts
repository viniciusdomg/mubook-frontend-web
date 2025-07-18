import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {EsqueceuSenhaComponent} from './components/auth/esqueceu-senha/esqueceu-senha.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './services/auth/auth.guard';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {GerenciarUsuariosComponent} from './components/gerenciar-usuarios/gerenciar-usuarios.component';
import { VizualizarQuadrasComponent } from './components/vizualizar-quadras/vizualizar-quadras.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import { RedefinirSenhaComponent } from './components/auth/redefinir-senha/redefinir-senha.component';
import {HorariosFuncionamentoComponent} from './components/horarios-funcionamento/horarios-funcionamento.component';
import {ReservasAgendarComponent} from './components/reservas-agendar/reservas-agendar.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
      { path: 'vizualizar-quadras', component: VizualizarQuadrasComponent, canActivate: [AuthGuard]},
      { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard]},
      { path: 'definicao-horarios', component: HorariosFuncionamentoComponent, canActivate: [AuthGuard]},
      { path: 'agendar-reserva', component: ReservasAgendarComponent, canActivate: [AuthGuard]},
      // { path: 'perfil', component: PerfilComponent },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },
      { path: 'redefinir-senha', component: RedefinirSenhaComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
