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
import { PillComponent } from '../pill/pill';

interface WheelSegment {
  label: string;
  colour: string;
  id: string;
}

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.html',
  styleUrls: ['./wheel.css'],
  imports: [ButtonComponent, FormsModule, PillComponent],
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
  targetSegmentLabel = signal<string>(''); // For pre-determined spin
  showTargetInput = signal<boolean>(false); // Toggle for target input visibility
  private rotation = signal(0); // total degrees of rotation
  readonly currentRotation = this.rotation.asReadonly();

  // Computed properties
  segmentCount = computed(() => Math.max(1, this.segments().length));
  segmentDegree = computed(() => 360 / this.segmentCount());
  private angle = computed(() => this.rotation() % 360);

  // index of the segment the arrow is currently pointing to
  readonly selectedSegmentIndex = computed(() => {
    const angle = (270 - this.angle()) % 360;
    return Math.floor(angle / this.segmentDegree());
  });

  // label of the segment the arrow is currently pointing to
  readonly selectedSegment = computed(() => {
    const index = this.selectedSegmentIndex();
    return this.segments()[index]?.label || '';
  });

  // check if target segment exists (for pre-determined spin)
  readonly targetSegmentExists = computed(() => {
    const target = this.targetSegmentLabel().toLowerCase();
    return this.segments().some(
      (segment) => segment.label.toLowerCase() === target
    );
  });

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
    const label = this.newSegmentLabel();
    if (!label) return;

    const currentSegments = this.segments();
    const newSegment: WheelSegment = {
      label,
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
        // Update the first empty segment with label
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

  removeSegment(id: string): void {
    this.segments.update((segments) => {
      const filtered = segments.filter((s) => s.id !== id);
      // Always keep at least one segment
      return filtered.length > 0
        ? filtered
        : [
            {
              label: '',
              colour: this.segmentColours[0],
              id: Date.now().toString(36) + Math.random().toString(36),
            },
          ];
    });
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
    const spinAmount = Math.ceil(Math.random() * 1000) + 360 * 5; // Random spin between 0 and 1000 degrees + 5 full spins
    this.rotation.update((current) => current + spinAmount);

    if (!this.results()) {
      console.error('Results not available');
      return;
    }
    setTimeout(() => {
      // this.dialogService.openDialog({
      //   template: this.results(),
      //   title: '🎉Results:',
      // });
      this.router.navigate(['/results'], {
        queryParams: { segment: this.selectedSegment(), type: 'random' },
      });
    }, 4000); // Wait for the spin animation to finish + 1000ms for added suspense
  }

  toggleTargetInput(): void {
    this.showTargetInput.update((show) => !show);
    if (!this.showTargetInput()) {
      this.targetSegmentLabel.set(''); // clear input when hidden
    }
  }

  spinToTargetSegment(): void {
    const targetLabel = this.targetSegmentLabel().toLowerCase();
    const targetIndex = this.segments().findIndex(
      (segment) => segment.label.toLowerCase() === targetLabel
    );

    if (targetIndex === -1) {
      console.error('Error spinning wheel');
      return;
    }

    //calculate target angle
    const segmentDegree = this.segmentDegree();
    const segmentCentreAngle = targetIndex * segmentDegree + segmentDegree / 2;

    const targetRotation = (360 - segmentCentreAngle) % 360;

    // add 5 spins
    const totalRotation = 5 * 360 + targetRotation;
    this.rotation.update((current) => current + totalRotation);

    // Store original target segment for results
    const originalTargetLabel = this.targetSegmentLabel();

    //hide and clear pre-determined spin input
    this.showTargetInput.set(false);
    this.targetSegmentLabel.set('');

    if (!this.results()) {
      console.error('Results not available');
      return;
    }

    setTimeout(() => {
      // this.dialogService.openDialog({
      //   template: this.results(),
      //   title: '🎉Results:',
      // });
      this.router.navigate(['/results'], {
        queryParams: { segment: originalTargetLabel, type: 'predetermined' },
      });
    }, 4000);
  }

  navigateToLandingPage(): void {
    this.dialogService.closeDialog();
    this.router.navigate(['/']);
  }
}
