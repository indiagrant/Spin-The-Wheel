import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  TemplateRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button';
import { DialogService } from '../dialog/dialog.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

const SEGMENT_COUNT = 8;
const SEGMENT_DEGREE = 360 / SEGMENT_COUNT;
const SEGMENT_LABELS = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface WheelSegment {
  label: string;
  colour: string;
  id: string;
}

@Component({
  selector: 'app-wheel',
  standalone: true,
  templateUrl: './wheel.html',
  styleUrls: ['./wheel.css'],
  imports: [ButtonComponent, FormsModule],
})
export class WheelComponent {
  // DI
  dialogService = inject<DialogService>(DialogService);
  router = inject<Router>(Router);

  // Properties
  @ViewChild('wheelContainer', { static: true })
  wheelContainer!: ElementRef<HTMLDivElement>;
  results = viewChild<TemplateRef<void>>('results');
  private segmentColours = [
    '#ff99c8', // pink
    '#fcf6bd', // yellow
    '#d0f4de', // green
    '#a9def9', // light blue
    '#e4c1f9', // purple
    '#fde4cf', // peach
    '#98f5e1', // teal
  ];

  // Signals
  segments = signal<WheelSegment[]>([]);
  newSegmentLabel = signal<string>('');
  private rotation = signal(0); // total degrees of rotation
  readonly currentRotation = this.rotation.asReadonly();

  // Computed properties
  segmentCount = computed(() => Math.max(1, this.segments().length));
  segmentDegree = computed(() => 360 / this.segmentCount());
  private angle = computed(() => this.rotation() % 360);

  // index of the segment the wheel is currently pointing to
  readonly selectedSegmentIndex = computed(() => {
    const normalised = (270 - this.angle()) % 360;
    return Math.floor(normalised / SEGMENT_DEGREE);
  });

  // label of the segment the wheel is currently pointing to
  readonly selectedSegment = computed(
    () => SEGMENT_LABELS[this.selectedSegmentIndex()]
  );

  constructor() {
    // Initialise wheel with one segment (entire circle)
    this.segments.set([
      {
        label: '',
        colour: this.segmentColours[0],
        id: Date.now().toString(36) + Math.random().toString(36),
      },
    ]);

    // rotate wheel using the DOM
    effect(() => {
      const degrees = this.rotation();
      if (this.wheelContainer) {
        const el = this.wheelContainer.nativeElement;
        el.style.transition = 'transform 3s ease-out';
        el.style.transform = `rotate(${degrees}deg)`;
      }
    });
  }

  // Methods
  addSegment(): void {
    const currentSegments = this.segments();
    const newSegment: WheelSegment = {
      label: this.newSegmentLabel().trim(),
      colour:
        this.segmentColours[
          currentSegments.length % this.segmentColours.length
        ],
      id: Date.now().toString(36) + Math.random().toString(36),
    };

    this.segments.update((segments) => [...segments, newSegment]);
    this.newSegmentLabel.set('');
  }

  updateFirstSegment(): void {
    const label = this.newSegmentLabel();
    if (!label) return;

    this.segments.update((segments) => {
      if (segments.length === 1 && segments[0].label === '') {
        // Update the first empty segment
        return [
          {
            ...segments[0],
            label,
          },
        ];
      } else {
        // Add as new segment
        return [
          ...segments,
          {
            label,
            colour:
              this.segmentColours[segments.length % this.segmentColours.length],
            id: Date.now().toString(36) + Math.random().toString(36),
          },
        ];
      }
    });
    this.newSegmentLabel.set('');
  }

  getSegmentStyle(segment: WheelSegment, index: number) {
    const segmentDegree = this.segmentDegree();
    const rotation = index * segmentDegree;

    if (this.segmentCount() === 1) {
      return {
        'background-color': segment.colour,
        transform: 'none',
        'clip-path': 'none',
      };
    }

    return {
      'background-color': segment.colour,
      transform: `rotate(${rotation}deg) translateX(-50%)`,
      'clip-path': 'polygon(100% 0, 50% 100%, 0 0)',
    };
  }

  spinWheel() {
    const spinAmount = Math.ceil(Math.random() * 1000);
    this.rotation.update((current) => current + spinAmount);

    if (!this.results()) {
      console.error('Results template is not available');
      return;
    }
    setTimeout(() => {
      this.dialogService.openDialog({
        template: this.results()!,
        title: '🎉Results:',
      });
    }, 4000); // Wait for the spin animation to finish + 1000ms for added suspense
  }

  spinWheelTo(degree: number) {
    const totalRotation = 360 * 5 + degree; // 5 full spins + desired position
    this.rotation.update((current) => current + totalRotation);
  }

  navigateToLandingPage(): void {
    this.dialogService.closeDialog();
    this.router.navigate(['/']);
  }
}
