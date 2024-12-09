import { Component, inject } from '@angular/core';
import { PullRequestsTableComponent } from "../pull-requests-table/pull-requests-table.component";
import { PullRequest } from '../../../core/review-rumble-api/models/pull-request.model';
import { ReviewRumbleApiService } from '../../../core/review-rumble-api/review-rumble-api.service';
import { SpinnerService } from '../../../shared/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assigned-pull-requests',
  imports: [PullRequestsTableComponent],
  templateUrl: './assigned-pull-requests.component.html',
  styleUrl: './assigned-pull-requests.component.css'
})
export class AssignedPullRequestsComponent {
  assignedPullRequests: PullRequest[] = [];

  readonly reviewRumbleApi = inject(ReviewRumbleApiService);
  readonly spinner = inject(SpinnerService);

  ngOnInit(): void {
    this.spinner.show();
    this.reviewRumbleApi.assignedPullRequests().subscribe({
      next: (pullRequests) => {
        this.assignedPullRequests = pullRequests;
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        // this.spinner.hide();
      },
      error: (error) => {
        console.error(error);
        this.spinner.hide();
      },
    });
  }
}
