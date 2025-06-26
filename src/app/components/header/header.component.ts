import { Component } from '@angular/core';
// import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    // RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownAtivo = false;

  // constructor(private apiService: ApiService, private router: Router) {
  //   const isLogado = this.apiService.isAuthenticated();
  //   console.log('LoginPageComponent: Usuário está logado?', isLogado);
  // }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownAtivo = !this.dropdownAtivo;
  }

  logout() {
    // this.apiService.logout().subscribe({
    //   next: () => {
    //     localStorage.removeItem('token');
    //     this.router.navigate(['/login']);
    //   },
    //   error: (err) => {
    //     console.error('Erro ao fazer logout:', err);
    //     // mesmo que dê erro, por segurança podemos limpar o token
    //     localStorage.removeItem('token');
    //     this.router.navigate(['/login']);
    //   }
    // });
  }
}
