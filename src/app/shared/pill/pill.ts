import { Component, EventEmitter, input, output } from '@angular/core';

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

  // Outputs
  remove = output<void>();

  // Methods
  handleRemove(): void {
    this.remove.emit();
  }
}
