import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layout/components/auth-layout.component';
import { PageLayoutComponent } from './shared/layout/components/page-layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { guestGuard } from './shared/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PAGES_ROUTES),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
];
