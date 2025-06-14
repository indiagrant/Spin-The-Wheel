// src/app/shared/theme/theme.service.ts
import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Properties
  private currentTheme = signal<Theme>('light');
  readonly theme = this.currentTheme.asReadonly();

  // Methods
  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  updateTheme() {
    this.currentTheme.update((value) => (value === 'light' ? 'dark' : 'light'));
  }
}
