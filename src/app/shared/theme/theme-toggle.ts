import { Component, computed, inject, signal } from '@angular/core';
import { Theme, ThemeService } from './theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggleComponent {
  // DI
  private themeService = inject<ThemeService>(ThemeService);

  // Properties
  themes: Theme[] = ['light', 'dark'];

  // Signals
  animating = signal<boolean>(false);
  animationClass = signal<'fade-in' | 'fade-out'>('fade-in');

  // Computed properties
  theme = computed(() => this.themeService.theme());

  // Methods
  toggleTheme() {
    this.animating.set(true);
    this.animationClass.set('fade-out');

    setTimeout(() => {
      this.themeService.updateTheme();
      this.animationClass.set('fade-in');
    }, 150);

    setTimeout(() => {
      this.animating.set(false);
    }, 300);
  }
}
