import { NgClass, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { ReviewRumbleApiService } from '../../core/review-rumble-api/review-rumble-api.service';
import { User } from '../../core/review-rumble-api/models/user.model';
import { SpinnerService } from '../../shared/spinner.service';

@Component({
  selector: 'app-leaderboard',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  readonly reviewRumbleApi = inject(ReviewRumbleApiService);
  readonly spinner = inject(SpinnerService);
  reviewers: Array<User> = [];

  ngOnInit(): void {
    this.spinner.show();
    this.reviewRumbleApi.leaderboard().subscribe({
      next: (reviewers) => {
        this.reviewers = reviewers;
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

  getIcon(index: number): string {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return '';
    }
  }
}
