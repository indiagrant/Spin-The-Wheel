import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/button/button';
import { ThemeToggleComponent } from './shared/theme/theme-toggle';
import { ThemeService } from './shared/theme/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ButtonComponent, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // DI
  private themeService = inject<ThemeService>(ThemeService);

  // Computed properties
  theme = computed(() => this.themeService.theme());

  // Methods
}
