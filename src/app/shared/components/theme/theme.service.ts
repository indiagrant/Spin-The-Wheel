import { Injectable, signal } from '@angular/core';
import { Theme } from '../../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Signals
  private currentTheme = signal<Theme>('light');
  readonly theme = this.currentTheme.asReadonly();

  // Methods
  updateTheme() {
    this.currentTheme.update((value) => (value === 'light' ? 'dark' : 'light'));
  }
}
