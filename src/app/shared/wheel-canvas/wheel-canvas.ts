import {
  Component,
  computed,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

interface WheelSegment {
  label: string;
  colour: string;
  id: string;
}

@Component({
  selector: 'app-wheel-canvas',
  imports: [],
  templateUrl: './wheel-canvas.html',
  styleUrl: './wheel-canvas.css',
})
export class WheelCanvasComponent {
  // canvas
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('wheel');
  private ctx: CanvasRenderingContext2D | null = null;

  // wheel properties
  private readonly centreX = 250;
  private readonly centreY = 250;
  private readonly radius = 230;

  private segmentColours = [
    '#ff99c8', // pink
    '#fcf6bd', // yellow
    '#d0f4de', // green
    '#a9def9', // light blue
    '#e4c1f9', // purple
    '#fde4cf', // peach
    '#98f5e1', // teal
  ];

  // signals
  segments = signal<WheelSegment[]>([]);

  // computed properties
  segmentCount = computed(() => Math.max(1, this.segments().length));
  segmentAngle = computed(() => 360 / this.segmentCount());

  constructor() {
    // test segments
    this.segments.set([
      {
        label: 'Segment 1',
        colour: this.segmentColours[0],
        id: this.generateId(),
      },
      {
        label: 'Segment 2',
        colour: this.segmentColours[1],
        id: this.generateId(),
      },
      {
        label: 'Segment 3',
        colour: this.segmentColours[2],
        id: this.generateId(),
      },
    ]);

    // redraw the wheel when segments change
    effect(() => {
      this.segments();
      this.drawWheel();
    });
  }

  ngAfterViewInit() {
    const canvasElement = this.canvas()?.nativeElement;
    if (canvasElement) {
      this.ctx = canvasElement.getContext('2d');

      this.drawWheel();
      this.drawSegments();
      this.drawArrow();
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2);
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

  private drawSegments() {
    if (!this.ctx) return;

    const ctx = this.ctx;
    const segments = this.segments();
    const segmentAngle = this.segmentAngle();

    segments.forEach((segment, index) => {
      // calculate start and end angles for each segment
      const startAngle = (index * segmentAngle * Math.PI) / 180; // convert degrees to radians
      const endAngle = ((index + 1) * segmentAngle * Math.PI) / 180;

      // draw segment as a slice of the circle
      ctx.beginPath();
      ctx.moveTo(this.centreX, this.centreY);
      ctx.arc(
        this.centreX,
        this.centreY,
        this.radius - 2,
        startAngle,
        endAngle
      );
      ctx.closePath();
      ctx.fillStyle = segment.colour;
      ctx.fill();
      ctx.strokeStyle = '#ffff';
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  }

  private drawArrow() {
    if (!this.ctx) return;

    const ctx = this.ctx;
    // draw arrow at the top of the wheel
    ctx.beginPath();
    ctx.moveTo(this.centreX, this.centreY - this.radius + 5); // tip of the arrow
    ctx.lineTo(this.centreX - 15, this.centreY - this.radius - 25); // left side
    ctx.lineTo(this.centreX + 15, this.centreY - this.radius - 25); // right side
    ctx.closePath();
    ctx.fillStyle = '#dc3545';
    ctx.fill();
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
