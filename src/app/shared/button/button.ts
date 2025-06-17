import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  // Inputs
  label = input.required<string>();
  disabled = input<boolean>(false);

  // Outputs
  btnClick = output<void>();

  // Methods
  handleClick(): void {
    this.btnClick.emit();
  }
}
