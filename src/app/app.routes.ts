import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {EsqueceuSenhaComponent} from './components/auth/cadastro-login/esqueceu-senha.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'esqueceu_senha',
    component: EsqueceuSenhaComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
