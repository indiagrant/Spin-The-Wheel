import { Component, computed, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './shared/components/theme/theme-toggle';
import { ThemeService } from './shared/components/theme/theme.service';
import { CommonModule } from '@angular/common';
import { DialogService } from './shared/components/dialog/dialog.service';
import { DialogData } from './shared/models';
import { DialogComponent } from './shared/components/dialog/dialog';

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
