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
  userStatus = this.data.user.status;

  onThemeChange(theme: string) {
    this.themeService.setTheme(theme);
  }

  onThemeColorChange(color: string) {
    this.themeService.setThemeColor(color);
  }
}
