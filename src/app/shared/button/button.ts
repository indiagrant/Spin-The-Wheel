import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  // Inputs
  label = input.required<string>();
  disabled = input(false);

  // Outputs
  btnClick = output<void>();

  // Methods
  handleClick(): void {
    this.btnClick.emit();
  }
}
