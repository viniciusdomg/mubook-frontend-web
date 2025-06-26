import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule,
    MatButtonModule, RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  toggleSubmenu(event: Event) {
    event.preventDefault();

    const link = (event.target as HTMLElement).closest('.menu-item');
    if (link) {
      link.classList.toggle('ativo');
    }
  }
}
