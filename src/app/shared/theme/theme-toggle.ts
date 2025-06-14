import { Component, computed, inject } from '@angular/core';
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

  // Computed properties
  theme = computed(() => this.themeService.theme());

  // Methods
  toggleTheme() {
    this.themeService.updateTheme();
  }
}
