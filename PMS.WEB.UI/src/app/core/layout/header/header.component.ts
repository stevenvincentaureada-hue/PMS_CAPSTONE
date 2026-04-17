import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  theme: string = 'light';
  notifications = [
    { title: 'New message from John Doe', time: '2 minutes ago' },
    { title: 'Your password will expire soon', time: '2 minutes ago' },
    { title: 'Alice uploaded a new profile picture', time: '1 hour ago' },
    { title: 'Mike sent you a friend request', time: '5 minutes ago' },
  ];
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
  }

  setTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: string) {
    if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute(
        'data-bs-theme',
        isDark ? 'dark' : 'light',
      );
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
