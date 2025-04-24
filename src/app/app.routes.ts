import { Routes } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {CadastroLoginComponent} from './components/auth/cadastro-login/cadastro-login.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'fazer_cadastro',
    component: CadastroLoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];
