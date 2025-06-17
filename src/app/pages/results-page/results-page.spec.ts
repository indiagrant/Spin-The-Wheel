import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsPageComponent } from './results-page';

describe('Results Page', () => {
  let component: ResultsPageComponent;
  let fixture: ComponentFixture<ResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
