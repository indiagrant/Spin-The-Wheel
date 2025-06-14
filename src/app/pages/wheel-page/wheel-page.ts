import { Component, inject, TemplateRef, viewChild } from '@angular/core';
import { WheelComponent } from '../../shared/wheel/wheel';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ButtonComponent } from '../../shared/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wheel-page',
  imports: [WheelComponent],
  templateUrl: './wheel-page.html',
  styleUrl: './wheel-page.css',
})
export class WheelPageComponent {}
