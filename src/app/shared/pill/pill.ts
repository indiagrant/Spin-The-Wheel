import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-pill',
  imports: [],
  templateUrl: './pill.html',
  styleUrl: './pill.css',
})
export class PillComponent {
  // Inputs
  label = input.required<string>();
  colour = input<string>('#ffff');
}
