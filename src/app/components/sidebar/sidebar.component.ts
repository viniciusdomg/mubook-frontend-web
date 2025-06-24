import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule,
    MatButtonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
