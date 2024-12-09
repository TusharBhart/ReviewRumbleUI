import { Component, inject } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  spinnerService = inject(SpinnerService);
}
