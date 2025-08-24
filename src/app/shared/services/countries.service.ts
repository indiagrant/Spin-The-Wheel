import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Country {
  name: {
    common: string;
    official: string;
  };
}

export interface CountrySegment {
  label: string;
  colour: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly API_URL = 'https://restcountries.com/v3.1/all?fields=name';

  private segmentColours = [
    '#ff99c8', // pink
    '#fcf6bd', // yellow
    '#d0f4de', // green
    '#ffadad', // light red
    '#a9def9', // light blue
    '#e4c1f9', // purple
    '#fde4cf', // peach
    '#98f5e1', // teal
  ];

  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountrySegment[]> {
    return this.http.get<Country[]>(this.API_URL).pipe(
      map((countries) =>
        countries
          // limit to 15 countries
          .slice(0, 15)
          .map((country, index) => ({
            label: country.name.common,
            colour: this.segmentColours[index % this.segmentColours.length],
            id: this.generateId(),
          }))
          .sort((a, b) => a.label.localeCompare(b.label))
      )
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2);
  }
}
