import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-pull-request-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './add-pull-request-dialog.component.html',
  styleUrl: './add-pull-request-dialog.component.css'
})
export class AddPullRequestDialogComponent {
  url: string = '';

  constructor(public dialogRef: MatDialogRef<AddPullRequestDialogComponent>) {}

  onSubmit(): void {
    if (this.url) {
      this.dialogRef.close(this.url);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
