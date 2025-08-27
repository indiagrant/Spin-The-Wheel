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
      import('./pages/create-own-wheel-page/wheel-page').then(
        (m) => m.WheelPageComponent
      ),
  },
  {
    path: 'countries-wheel',
    loadComponent: () =>
      import('./pages/countries-wheel-page/countries-wheel').then(
        (m) => m.CountriesWheelComponent
      ),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./pages/results-page/results-page').then(
        (m) => m.ResultsPageComponent
      ),
  },
];
