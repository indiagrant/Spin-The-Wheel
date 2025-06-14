import { Component, inject } from '@angular/core';
import { PanelComponent } from '../panel/panel';
import { DialogService } from './dialog.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [PanelComponent, NgTemplateOutlet],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class DialogComponent {
  // DI
  private dialogService = inject<DialogService>(DialogService);
  dialogData = this.dialogService.dialogData;

  closeDialog(): void {
    this.dialogService.closeDialog();
  }
}
