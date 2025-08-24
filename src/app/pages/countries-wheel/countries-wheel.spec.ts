import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesWheel } from './countries-wheel';

describe('CountriesWheel', () => {
  let component: CountriesWheel;
  let fixture: ComponentFixture<CountriesWheel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesWheel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesWheel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
