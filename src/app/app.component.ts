import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MainBackgroundComponent } from './components/main-background/main-background.component';
@Component({
  selector: 'app-root',
  imports: [
    SidebarComponent,
    HeaderComponent,
    MainBackgroundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MuBook';
}
