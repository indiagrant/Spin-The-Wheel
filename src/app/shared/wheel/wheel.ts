import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-wheel',
  standalone: true,
  templateUrl: './wheel.html',
  styleUrls: ['./wheel.css'],
  imports: [ButtonComponent],
})
export class WheelComponent {
  @ViewChild('crfCanvas', { static: true })
  crfCanvas!: ElementRef<HTMLCanvasElement>;

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  deg!: number;
  speed = 10;
  slowDownRand = 0;
  color_data = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F1C40F',
    '#8E44AD',
    '#E74C3C',
  ];
  label_data = [
    'Prize 1',
    'Prize 2',
    'Prize 3',
    'Prize 4',
    'Prize 5',
    'Prize 6',
  ];
  width!: number;
  center!: number;

  isSpinning = signal(false);

  ngOnInit(): void {
    this.canvas = this.crfCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width; // set width first
    this.center = this.width / 2; // then center

    this.deg = this.rand(0, 360);
    this.create_spinner();
  }

  spinWheel() {
    this.isSpinning.set(true);

    setTimeout(() => {
      this.isSpinning.set(false);
    }, 3000); // Simulate 3s spin
  }

  rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  deg2rad(deg: number) {
    return (deg * Math.PI) / 180;
  }

  create_spinner() {
    if (!this.ctx) return;

    const slices = this.color_data.length;
    const sliceDeg = 360 / slices;
    this.deg = this.rand(0, 360);
    this.speed = 10;
    this.slowDownRand = 0;

    this.ctx.clearRect(0, 0, this.width, this.width);

    let currentDeg = this.deg;

    for (let i = 0; i < slices; i++) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color_data[i];
      this.ctx.moveTo(this.center, this.center);
      this.ctx.arc(
        this.center,
        this.center,
        this.width / 2,
        this.deg2rad(currentDeg),
        this.deg2rad(currentDeg + sliceDeg)
      );
      this.ctx.lineTo(this.center, this.center);
      this.ctx.fill();

      const drawText_deg = currentDeg + sliceDeg / 2;

      this.ctx.save();
      this.ctx.translate(this.center, this.center);
      this.ctx.rotate(this.deg2rad(drawText_deg));
      this.ctx.textAlign = 'right';
      this.ctx.fillStyle = '#fff';
      this.ctx.font = 'bold 15px sans-serif';
      this.ctx.fillText(this.label_data[i], 100, 5);
      this.ctx.restore();

      currentDeg += sliceDeg;
    }
  }
}
