import { Component, inject } from '@angular/core';
import { PullRequest } from '../../../core/review-rumble-api/models/pull-request.model';
import { PullRequestsTableComponent } from '../pull-requests-table/pull-requests-table.component';
import { ReviewRumbleApiService } from '../../../core/review-rumble-api/review-rumble-api.service';
import { SpinnerService } from '../../../shared/spinner.service';

@Component({
  selector: 'app-all-pull-requests',
  imports: [PullRequestsTableComponent],
  templateUrl: './all-pull-requests.component.html',
  styleUrl: './all-pull-requests.component.css'
})
export class AllPullRequestsComponent {
  allPullRequests: PullRequest[] = [];

  readonly reviewRumbleApi = inject(ReviewRumbleApiService);
  readonly spinner = inject(SpinnerService);

  ngOnInit(): void {
    this.spinner.show();
    this.reviewRumbleApi.allPullRequests().subscribe({
      next: (pullRequests) => {
        this.allPullRequests = pullRequests;
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
