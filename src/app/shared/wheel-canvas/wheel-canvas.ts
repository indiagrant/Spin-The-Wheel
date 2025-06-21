import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-wheel-canvas',
  imports: [],
  templateUrl: './wheel-canvas.html',
  styleUrl: './wheel-canvas.css',
})
export class WheelCanvasComponent {
  // canvas properties
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('wheel');
  private ctx: CanvasRenderingContext2D | null = null;

  // wheel properties
  private readonly centreX = 250;
  private readonly centreY = 250;
  private readonly radius = 230;

  ngAfterViewInit() {
    const canvasElement = this.canvas()?.nativeElement;
    if (canvasElement) {
      this.ctx = canvasElement.getContext('2d');

      this.drawWheel();
    }
  }
  private drawWheel() {
    if (!this.ctx) return;

    const ctx = this.ctx;
    //clear canvas
    ctx.clearRect(0, 0, 500, 500);

    // draw wheel background circle
    ctx.beginPath();
    ctx.arc(this.centreX, this.centreY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f8f9fa';
    ctx.fill();
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
