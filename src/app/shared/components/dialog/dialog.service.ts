import { Injectable, signal } from '@angular/core';
import { DialogData } from '../../models/';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _showDialog = signal<boolean>(false);
  showDialog = this._showDialog.asReadonly();

  private _dialogData = signal<DialogData | undefined>(undefined);
  dialogData = this._dialogData.asReadonly();

  openDialog(dialogData: DialogData): void {
    this._dialogData.set(dialogData);
    this._showDialog.set(true);
  }

  closeDialog(): void {
    this._showDialog.set(false);
    this._dialogData.set(undefined);
  }
}
