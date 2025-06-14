import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './shared/theme/theme-toggle';
import { ThemeService } from './shared/theme/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // DI
  private themeService = inject(ThemeService);

  // Computed properties
  theme = computed(() => this.themeService.theme());
}
