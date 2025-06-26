import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {MainBackgroundComponent} from '../../components/main-background/main-background.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    RouterOutlet,
    SidebarComponent,
    MainBackgroundComponent,
    MainBackgroundComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
