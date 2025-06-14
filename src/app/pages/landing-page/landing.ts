import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button';
import { ThemeToggleComponent } from '../../shared/theme/theme-toggle';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../shared/theme/theme.service';
import { computed, inject } from '@angular/core';
import { PanelComponent } from '../../shared/panel/panel';
import { DialogComponent } from '../../shared/dialog/dialog';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  imports: [CommonModule, ButtonComponent],
})
export class LandingComponent {
  // DI
  private router = inject(Router);
  private themeService = inject(ThemeService);

  // Computed properties
  theme = computed(() => this.themeService.theme());

  // Methods
  navigateToWheel() {
    this.router.navigate(['/wheel']);
  }
}
