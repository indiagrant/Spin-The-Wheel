import { Component } from '@angular/core';
import { WheelComponent } from '../../shared/wheel/wheel';
import { WheelCanvasComponent } from '../../shared/wheel-canvas/wheel-canvas';

@Component({
  selector: 'app-wheel-page',
  imports: [WheelComponent, WheelCanvasComponent],
  templateUrl: './wheel-page.html',
  styleUrl: './wheel-page.css',
})
export class WheelPageComponent {}
