import { Component, inject } from '@angular/core';
import { PullRequestsTableComponent } from "../pull-requests-table/pull-requests-table.component";
import { PullRequest } from '../../../core/review-rumble-api/models/pull-request.model';
import { SpinnerService } from '../../../shared/spinner.service';
import { ReviewRumbleApiService } from '../../../core/review-rumble-api/review-rumble-api.service';

@Component({
  selector: 'app-my-pull-requests',
  imports: [PullRequestsTableComponent],
  templateUrl: './my-pull-requests.component.html',
  styleUrl: './my-pull-requests.component.css'
})
export class MyPullRequestsComponent {
  myPullRequests: PullRequest[] = [];

  readonly reviewRumbleApi = inject(ReviewRumbleApiService);
  readonly spinner = inject(SpinnerService);

  ngOnInit(): void {
    this.spinner.show();
    this.reviewRumbleApi.myPullRequests().subscribe({
      next: (pullRequests) => {
        this.myPullRequests = pullRequests;
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
