import { Component, computed, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './shared/theme/theme-toggle';
import { ThemeService } from './shared/theme/theme.service';
import { CommonModule } from '@angular/common';
import { DialogData, DialogService } from './shared/dialog/dialog.service';
import { DialogComponent } from './shared/dialog/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ThemeToggleComponent, DialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // DI
  private themeService = inject(ThemeService);
  private dialogService = inject(DialogService);

  // Properties
  showDialog: Signal<boolean> = this.dialogService.showDialog;
  dialogData: Signal<DialogData | undefined> = this.dialogService.dialogData;

  // Computed properties
  theme = computed(() => this.themeService.theme());
}
