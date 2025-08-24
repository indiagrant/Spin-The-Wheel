import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../shared/components/theme/theme.service';
import { computed, inject } from '@angular/core';
import { CountriesService } from '../../shared/services/countries.service';
import { catchError, of } from 'rxjs';

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
  private countriesService = inject(CountriesService);

  // signals
  loadingCountries = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Computed properties
  theme = computed(() => this.themeService.theme());

  // Methods
  navigateToWheel() {
    this.router.navigate(['/wheel']);
  }

  navigateToCountriesWheel() {
    this.loadingCountries.set(true);
    this.errorMessage.set('');

    this.countriesService
      .getCountries()
      .pipe(
        catchError((error) => {
          this.errorMessage.set(
            'Failed to load countries. Please try again later.'
          );
          return of([]);
        })
      )
      .subscribe((countries) => {
        this.loadingCountries.set(false);

        if (countries.length > 0) {
          this.router.navigate(['/countries-wheel'], { state: { countries } });
        }
      });
  }
}
