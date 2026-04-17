import { AfterViewInit, Component } from '@angular/core';
import { SidebarService } from '../../../shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {
  constructor(private sidebarService: SidebarService) {}

  ngAfterViewInit(): void {
    this.sidebarService.init();
  }
}
