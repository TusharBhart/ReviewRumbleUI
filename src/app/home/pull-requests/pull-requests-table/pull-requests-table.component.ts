import { NgClass, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PullRequest, ReviewStatus } from '../../../core/review-rumble-api/models/pull-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewRumbleApiService } from '../../../core/review-rumble-api/review-rumble-api.service';
import { SpinnerService } from '../../../shared/spinner.service';

@Component({
  selector: 'app-pull-requests-table',
  imports: [NgClass, MatTableModule, DatePipe, MatPaginatorModule, MatSortModule, MatTabsModule, MatButtonModule, MatIconModule, MatToolbarModule, MatChipsModule, MatSelectModule, MatOptionModule],
  templateUrl: './pull-requests-table.component.html',
  styleUrl: './pull-requests-table.component.css'
})
export class PullRequestsTableComponent {
  displayedColumns: string[] = ['title', 'author', 'repository', 'status', 'addedDate', 'reviewers'];
  statusOptions: string[] = ['Open', 'InReview', 'RequestChanges', 'Approved'];

  @Input() pullRequests: PullRequest[] = [];
  @Input() showActions: boolean = false;
 
  readonly reviewRumbleApi = inject(ReviewRumbleApiService);
  readonly spinner = inject(SpinnerService);
  readonly snackBar = inject(MatSnackBar);

  getStatusColor(status: string): string {
    switch (status as ReviewStatus) {
      case ReviewStatus.Open:
        return 'status-open';
      case ReviewStatus.InReview:
        return 'status-inreview';
      case ReviewStatus.RequestChanges:
        return 'status-requestchanges';
      case ReviewStatus.Approved:
        return 'status-approved';
    }
  }

  updateStatus(pullRequest: PullRequest, status: ReviewStatus): void {
    this.spinner.show();
    this.reviewRumbleApi.updatePullRequestStatus(pullRequest.id, status).subscribe({
      next: () => {
        this.spinner.hide();
        this.snackBar.open(`Pull request status updated to ${status}`, 'Close', {
          duration: 5000,
        });
      },
      error: (error) => {
        console.error(error);
        this.spinner.hide();

        this.snackBar.open('Some Error Occured. Please try again later!', 'Close', {
          duration: 5000,
        });
      },
    });
  }
}