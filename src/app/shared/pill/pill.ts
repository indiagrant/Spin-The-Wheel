import { Component, EventEmitter, input, output, signal } from '@angular/core';

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

  // signals
  removing = signal(false);

  // Methods
  handleRemove(): void {
    this.removing.set(true);
    // Delay for animation
    setTimeout(() => this.remove.emit(), 300);
  }
}
