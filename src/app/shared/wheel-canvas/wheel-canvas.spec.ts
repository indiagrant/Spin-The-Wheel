import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelCanvasComponent } from './wheel-canvas';

describe('WheelCanvas', () => {
  let component: WheelCanvasComponent;
  let fixture: ComponentFixture<WheelCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WheelCanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WheelCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
