import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SpinnerService } from '../../shared/spinner.service';
import { ReviewRumbleApiService } from '../../core/review-rumble-api/review-rumble-api.service';

@Component({
  selector: 'app-add-pull-request-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './add-pull-request-dialog.component.html',
  styleUrl: './add-pull-request-dialog.component.css',
})
export class AddPullRequestDialogComponent {
  url: string = '';
  dialogRef = inject(MatDialogRef<AddPullRequestDialogComponent>);
  spinner = inject(SpinnerService);
  reviewRumbleApi = inject(ReviewRumbleApiService);

  onSubmit(): void {
    if (this.url) {
      this.spinner.show();

      this.reviewRumbleApi.addPullRequest(this.url).subscribe({
        next: () => {
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error(error);
          this.spinner.hide();
          this.dialogRef.close(false);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
