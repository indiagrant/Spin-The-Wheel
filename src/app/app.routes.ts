import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing').then((m) => m.LandingComponent),
  },
  {
    path: 'wheel',
    loadComponent: () =>
      import('./pages/wheel-page/wheel-page').then((m) => m.WheelPageComponent),
  },
];
