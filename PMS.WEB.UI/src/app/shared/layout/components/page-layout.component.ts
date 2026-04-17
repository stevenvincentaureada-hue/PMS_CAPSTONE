import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component';
import { HeaderComponent } from '../../../core/layout/header/header.component';

@Component({
    selector: 'app-page-layout',
    imports: [RouterOutlet, SidebarComponent, HeaderComponent],
    template: `<div>
  <app-sidebar></app-sidebar>
  <div class="position-relative h-100">
    <app-header></app-header>
    <router-outlet></router-outlet>
  </div>
</div>`
})
export class PageLayoutComponent { }