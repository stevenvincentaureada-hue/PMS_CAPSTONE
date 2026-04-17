import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    setTimeout(() => {
      this.initToggle();
      this.initSubmenus();
      this.setActiveRoute();
      this.setHeight();
      this.initRouteListener();
    }, 100);
  }

  private initToggle(): void {
    const toggles = document.querySelectorAll('.sidebar-toggle');
    const expanded = localStorage.getItem('sidebarExpanded') === 'true';
    
    document.documentElement.classList[expanded ? 'add' : 'remove']('expanded');
    document.documentElement.classList[expanded ? 'remove' : 'add']('collapsed');
    
    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = localStorage.getItem('sidebarExpanded') === 'true';
        const action = isExpanded ? 'remove' : 'add';
        const opposite = isExpanded ? 'add' : 'remove';
        
        document.documentElement.classList[action]('expanded');
        document.documentElement.classList[opposite]('collapsed');
        localStorage.setItem('sidebarExpanded', String(!isExpanded));
        
        setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
      });
    });
  }

  private initSubmenus(): void {
    document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const menu = (toggle as HTMLElement).nextElementSibling;
        menu?.classList.toggle('show');
      });
    });
  }

  private setActiveRoute(): void {
    const path = window.location.pathname;
    document.querySelectorAll('#miniSidebar .nav-link, .offcanvas .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && path.includes(href)) {
        link.classList.add('active');
        this.openParentDropdowns(link);
      }
    });
  }

  private openParentDropdowns(link: Element): void {
    const parent = link.closest('.dropdown');
    if (parent) {
      parent.querySelector('.dropdown-toggle')?.classList.add('active');
      parent.querySelector('.dropdown-menu')?.classList.add('show');
    }
  }

  private initRouteListener(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.setActiveRoute(), 100));
  }

  private setHeight(): void {
    const sidebar = document.getElementById('miniSidebar');
    const content = document.getElementById('content');
    
    const update = () => {
      if (sidebar && content) {
        sidebar.style.height = `${Math.max(window.innerHeight - 45, content.offsetHeight)}px`;
      }
    };
    
    update();
    window.addEventListener('resize', update);
    
    const observer = new MutationObserver(update);
    if (content) observer.observe(content, { childList: true, subtree: true });
  }
}