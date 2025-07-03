import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {EsqueceuSenhaComponent} from './components/auth/esqueceu-senha/esqueceu-senha.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './services/auth/auth.guard';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {GerenciarUsuariosComponent} from './components/gerenciar-usuarios/gerenciar-usuarios.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'gerenciar-usuarios', component: GerenciarUsuariosComponent, canActivate: [AuthGuard] },
      // { path: 'perfil', component: PerfilComponent },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
