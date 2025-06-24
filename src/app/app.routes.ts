import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {EsqueceuSenhaComponent} from './components/auth/esqueceu-senha/esqueceu-senha.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services/authentication/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'esqueceu_senha',
    component: EsqueceuSenhaComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];
