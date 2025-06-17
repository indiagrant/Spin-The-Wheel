import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Signals
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
