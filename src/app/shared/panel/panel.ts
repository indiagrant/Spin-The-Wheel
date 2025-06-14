import { Component, input } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class PanelComponent {
  // Inputs
  title = input<string | undefined>('');

  // Methods
}
