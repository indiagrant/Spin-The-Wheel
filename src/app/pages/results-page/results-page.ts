import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button';

@Component({
  selector: 'app-results-page',
  imports: [ButtonComponent],
  templateUrl: './results-page.html',
  styleUrl: './results-page.css',
})
export class ResultsPageComponent {
  // DI
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signals
  selectedSegment = signal<string>('');
  spinType = signal<'random' | 'predetermined'>('random');

  ngOnInit() {
    // Get query parameters
    this.route.queryParams.subscribe((params) => {
      this.selectedSegment.set(params['segment'] || 'Unknown');
      this.spinType.set(params['type'] || 'random');
    });
  }

  // Methods
  navigateToLandingPage(): void {
    this.router.navigate(['/']);
  }
}
