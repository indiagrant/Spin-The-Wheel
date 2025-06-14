import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { WheelComponent } from '../../shared/wheel/wheel';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ButtonComponent } from '../../shared/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wheel-page',
  imports: [WheelComponent, ButtonComponent],
  templateUrl: './wheel-page.html',
  styleUrl: './wheel-page.css',
})
export class WheelPageComponent {
  // DI
  dialogService = inject<DialogService>(DialogService);
  router = inject<Router>(Router);

  // Properties
  results = viewChild<TemplateRef<void>>('results');

  // ngOnInit(): void {
  //   this.openResultsDialog();
  // }

  // Methods
  openResultsDialog(): void {
    const resultsTemplate = this.results();
    if (!resultsTemplate) {
      console.error('Results template is not available');
      return;
    }

    this.dialogService.openDialog({
      template: resultsTemplate,
      title: 'Results',
    });
  }

  navigateToLanding(): void {
    this.router.navigate(['/']);
    this.dialogService.closeDialog();
  }
}
