import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button';
import { FormsModule } from '@angular/forms';
import { PillComponent } from '../pill/pill';
import { Router } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';

interface WheelSegment {
  label: string;
  colour: string;
  id: string;
}

@Component({
  selector: 'app-wheel-canvas',
  imports: [ButtonComponent, FormsModule, PillComponent],
  templateUrl: './wheel-canvas.html',
  styleUrl: './wheel-canvas.css',
})
export class WheelCanvasComponent {
  // DI
  private router = inject<Router>(Router);
  private dialogService = inject<DialogService>(DialogService);

  // References
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('wheel');
  private ctx: CanvasRenderingContext2D | null = null;
  results = viewChild<TemplateRef<void>>('results');

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
  newSegmentLabel = signal<string>('');
  targetSegmentLabel = signal<string>(''); // For pre-determined spin
  showTargetInput = signal<boolean>(false); // Toggle for pre-determined spin input
  isSpinning = signal(false);
  private currentRotation = signal(0); // total degrees of rotation

  // computed properties
  segmentCount = computed(() => Math.max(1, this.segments().length));
  segmentAngle = computed(() => 360 / this.segmentCount());

  // Calculate which segment the arrow is pointing to
  selectedSegmentIndex = computed(() => {
    const rotation = this.currentRotation() % 360;
    const adjustedRotation = (360 - rotation) % 360;
    const segmentAngle = this.segmentAngle();
    const index = Math.floor(adjustedRotation / segmentAngle);
    return Math.min(index, this.segments().length - 1);
  });

  selectedSegment = computed(() => {
    const index = this.selectedSegmentIndex();
    return this.segments()[index]?.label || '';
  });

  // Check if target segment exists (for pre-determined spin)
  targetSegmentExists = computed(() => {
    const target = this.targetSegmentLabel().toLowerCase().trim();
    return this.segments().some(
      (segment) => segment.label.toLowerCase() === target
    );
  });

  constructor() {
    // start with one empty segment
    this.segments.set([
      {
        label: '',
        colour: this.segmentColours[0],
        id: this.generateId(),
      },
    ]);

    // redraw the wheel when segments change
    effect(() => {
      this.segments();
      this.drawWheel();
    });

    // Effect to handle spinning animation
    effect(() => {
      const degrees = this.currentRotation();
      const canvasEl = this.canvas();

      if (canvasEl) {
        const el = canvasEl.nativeElement;
        el.style.transition = 'transform 3s ease-out';
        el.style.transform = `rotate(${degrees}deg)`;
      }
    });
  }

  ngAfterViewInit() {
    const canvasElement = this.canvas()?.nativeElement;
    if (canvasElement) {
      this.ctx = canvasElement.getContext('2d');

      this.drawWheel();
    }
  }

  // utility methods
  private generateId(): string {
    return Math.random().toString(36).substring(2);
  }

  navigateToLandingPage(): void {
    this.dialogService.closeDialog();
    this.router.navigate(['/']);
  }

  // Segment management methods
  addSegment(): void {
    const label = this.newSegmentLabel().trim();
    if (!label) return;

    const newSegment: WheelSegment = {
      label,
      colour:
        this.segmentColours[
          this.segments().length % this.segmentColours.length
        ],
      id: this.generateId(),
    };

    this.segments.update((segments) => [...segments, newSegment]);
    this.newSegmentLabel.set('');
  }

  updateFirstSegment(): void {
    const label = this.newSegmentLabel().trim();
    if (!label) return;

    this.segments.update((segments) => {
      if (segments.length === 1 && segments[0].label === '') {
        // Update the first empty segment with label
        return [{ ...segments[0], label }];
      } else {
        // Add as new segment
        return [
          ...segments,
          {
            label,
            colour:
              this.segmentColours[segments.length % this.segmentColours.length],
            id: this.generateId(),
          },
        ];
      }
    });
    this.newSegmentLabel.set('');
  }

  removeSegment(id: string): void {
    this.segments.update((segments) => segments.filter((s) => s.id !== id));
  }

  // Wheel spin methods
  spinWheel(): void {
    if (this.isSpinning()) return;

    const baseRotation = 360 * 5; // 5 full rotations
    const randomRotation = Math.random() * 360;
    const totalRotation = baseRotation + randomRotation;

    this.currentRotation.update((current) => current + totalRotation);
    this.isSpinning.set(true);

    // Note: comment/uncomment router/dialog block for different results views
    setTimeout(() => {
      this.isSpinning.set(false);
      this.router.navigate(['/results'], {
        queryParams: { segment: this.selectedSegment() },
      });
      // this.dialogService.openDialog({
      //   template: this.results()!,
      //   title: '🎉 Results:',
      // });
    }, 4000);
  }

  spinToTargetSegment(): void {
    if (this.isSpinning()) return;

    const targetLabel = this.targetSegmentLabel().toLowerCase().trim();
    const targetIndex = this.segments().findIndex(
      (segment) => segment.label.toLowerCase() === targetLabel
    );

    if (targetIndex === -1) return;

    const segmentAngle = this.segmentAngle();
    const targetSegmentCentre = targetIndex * segmentAngle + segmentAngle / 2;
    const baseRotation = 360 * 5; // 5 full rotations

    // Calculate rotation needed to align target segment with arrow (top)
    const finalRotation = baseRotation + (360 - targetSegmentCentre);

    this.currentRotation.update((current) => current + finalRotation);
    this.isSpinning.set(true);

    // Hide target input
    this.showTargetInput.set(false);
    this.targetSegmentLabel.set('');

    // Note: comment/uncomment router/dialog block for different results views
    setTimeout(() => {
      this.isSpinning.set(false);
      this.router.navigate(['/results'], {
        queryParams: { segment: this.selectedSegment() },
      });
      // this.dialogService.openDialog({
      //   template: this.results()!,
      //   title: '🎉 Results:',
      // });
    }, 4000);
  }

  toggleTargetInput(): void {
    this.showTargetInput.update((show) => !show);
    if (!this.showTargetInput()) {
      this.targetSegmentLabel.set('');
    }
  }

  // Drawing the wheel methods
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

    // draw segments
    this.drawSegments();
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

      if (segment.label) {
        this.drawSegmentLabel(segment.label, index, segmentAngle);
      }
    });
  }

  private drawSegmentLabel(label: string, index: number, segmentAngle: number) {
    if (!this.ctx) return;

    const ctx = this.ctx;
    // calculate angle for centre of the segment
    const angle = ((index * segmentAngle + segmentAngle / 2) * Math.PI) / 180;
    const labelRadius = this.radius * 0.7;

    // calculate label position
    const x = this.centreX + Math.cos(angle) * labelRadius;
    const y = this.centreY + Math.sin(angle) * labelRadius;

    ctx.save();

    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
  }
}
