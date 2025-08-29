import { Component, inject } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { CountriesService } from '../../shared/services/countries.service';

@Component({
  selector: 'app-countries-wheel',
  imports: [SpinnerComponent],
  templateUrl: './countries-wheel.html',
  styleUrl: './countries-wheel.css',
})
export class CountriesWheelComponent {
  // DI
  private countriesService = inject(CountriesService);

  // properties
  countries = toSignal(this.countriesService.getCountries(), {
    initialValue: [],
  });
}
