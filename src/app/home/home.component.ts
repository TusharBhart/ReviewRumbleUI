import { Component, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { AddPullRequestDialogComponent } from './add-pull-request-dialog/add-pull-request-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly snackBar = inject(MatSnackBar);

  user = this.route.snapshot.data['user'];

  openDialog() {
    const dialogRef = this.dialog.open(AddPullRequestDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Pull request added successfully', 'Close', {
          duration: 5000,
        });

        this.router.navigate(['home', 'my-pull-requests']);
      } else {
        this.snackBar.open('Some Error Occured. Please try again later!', 'Close', {
          duration: 5000,
        });
      }
    });
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '500px',
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('URL entered:', result);
      }
    );
  }

  getMilestoneTooltip(): string {
    let title = '';
    let emoji = '';
    let totalReviewPRs = this.user.totalReviewCount;

    if (totalReviewPRs < 10) {
      title = 'Novice Reviewer';
      emoji = '👶';
    } else if (totalReviewPRs >= 10 && totalReviewPRs < 50) {
      title = 'Junior Reviewer';
      emoji = '🦸‍♂️';
    } else if (totalReviewPRs >= 50 && totalReviewPRs < 100) {
      title = 'Experienced Reviewer';
      emoji = '🦸‍♀️';
    } else if (totalReviewPRs >= 100) {
      title = 'Master Reviewer';
      emoji = '🏆';
    }

    return `${emoji} ${title}\n(${totalReviewPRs} reviews)`;
  }

  getGithubAvatarUrl(): string {
    return `https://avatars.githubusercontent.com/u/${this.user.id}?v=4&size=64`;
  }
}
