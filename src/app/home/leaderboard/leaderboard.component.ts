import { NgClass, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-leaderboard',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule, MatButtonModule, MatIconModule, MatToolbarModule, MatChipsModule, MatSelectModule, MatOptionModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  leaders = [
    { username: 'gauravpreet-wg', reviews: 120 },
    { username: 'sakshammittal', reviews: 110 },
    { username: 'snehagoyal-wg', reviews: 100 },
    { username: 'tusharbhart-wg', reviews: 90 },
    { username: 'afeefashraf-wg', reviews: 80 },
  ];

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
