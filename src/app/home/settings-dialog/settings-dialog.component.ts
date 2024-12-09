import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
  MatDialogActions,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ThemeService } from '../../shared/theme.service';
import { MatChipsModule } from '@angular/material/chips';
import { UserStatus } from '../../core/review-rumble-api/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewRumbleApiService } from '../../core/review-rumble-api/review-rumble-api.service';
import { SpinnerService } from '../../shared/spinner.service';

@Component({
  selector: 'app-settings-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatButtonToggleModule, MatDialogClose, MatDialogActions, MatButtonModule, FormsModule, MatChipsModule],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.css'
})
export class SettingsDialogComponent {
  themeService = inject(ThemeService);
  data = inject(MAT_DIALOG_DATA);

  selectedTheme: string = this.themeService.currentTheme();
  selectedThemeColor: string = this.themeService.currentThemeColor();
  userStatus = this.data.user.status.toLowerCase();

  readonly reviewRumbleApi = inject(ReviewRumbleApiService);
  readonly spinner = inject(SpinnerService);
  readonly snackBar = inject(MatSnackBar);

  onThemeChange(theme: string) {
    this.themeService.setTheme(theme);
  }

  onThemeColorChange(color: string) {
    this.themeService.setThemeColor(color);
  }

  onStatusChange(status: UserStatus): void {
    this.spinner.show();
    this.reviewRumbleApi.updateUserStatus(status).subscribe({
      next: () => {
        this.spinner.hide();
        this.snackBar.open(`Your status updated to ${status}`, 'Close', {
          duration: 5000,
        });
      },
      error: (error) => {
        console.error(error);
        this.spinner.hide();
        this.userStatus = this.data.user.status.toLowerCase();
        this.snackBar.open('Some Error Occured. Please try again later!', 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
