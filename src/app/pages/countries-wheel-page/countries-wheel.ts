import { Component, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner';
import { Router } from '@angular/router';
import { CountrySegment } from '../../shared/services/countries.service';

@Component({
  selector: 'app-countries-wheel',
  imports: [SpinnerComponent],
  templateUrl: './countries-wheel.html',
  styleUrl: './countries-wheel.css',
})
export class CountriesWheelComponent implements OnInit {
  // DI
  private router = inject(Router);

  // properties
  countries: CountrySegment[] = [];

  ngOnInit(): void {
    const state = history.state;

    if (state?.countries) {
      this.countries = state.countries;
    } else {
      this.router.navigate(['/']);
    }
  }
}
