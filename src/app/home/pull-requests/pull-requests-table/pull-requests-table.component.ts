import { NgClass, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-pull-requests-table',
  imports: [NgClass, MatTableModule, DatePipe, MatPaginatorModule, MatSortModule, MatTabsModule, MatButtonModule, MatIconModule, MatToolbarModule, MatChipsModule, MatSelectModule, MatOptionModule],
  templateUrl: './pull-requests-table.component.html',
  styleUrl: './pull-requests-table.component.css'
})
export class PullRequestsTableComponent {
  displayedColumns: string[] = ['title', 'author', 'repository', 'status', 'addedDate', 'reviewers'];
  statusOptions: string[] = ['Open', 'In Review', 'Request Changes', 'Approved'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pullRequests: PullRequest[] = [
    {
      title: 'https://github.com/watchguard-it/JenkinsPipelineSharedLibraries/pull/103',
      author: 'gauravpreet-wg',
      url: 'https://github.com/EmsAdminUI/repo/pull/1',
      repository: 'EmsAdminUI',
      status: ReviewStatusEnum.Approved,
      addedDate: new Date('2024-12-04'),
      reviewers: ['tusharbhart-wg', 'afeefashraf-wg']
    },
    {
      title: '[ITDIGIT-XXXXX] Added Feature',
      author: 'sakshammital',
      url: 'https://github.com/example/repo/pull/2',
      repository: 'BusinessRuleApi',
      status: ReviewStatusEnum.InReview,
      addedDate: new Date('2024-12-04'),
      reviewers: ['snehagoyal-wg', 'tusharbhart-wg']
    },
    {
      title: '[ITDIGIT-XXXXX] Refactor Code',
      author: 'afeefashraf-wg',
      url: 'https://github.com/example/repo/pull/3',
      repository: 'EmsAdminApi',
      status: ReviewStatusEnum.RequestChanges,
      addedDate: new Date('2024-12-04'),
      reviewers: ['gauravpreet-wg', 'sakshammital']
    },
    {
      title: '[ITDIGIT-XXXXX] Update Dependencies',
      author: 'tusharbhart-wg',
      url: 'https://github.com/example/repo/pull/4',
      repository: 'DeviceDetailsApi',
      status: ReviewStatusEnum.Open,
      addedDate: new Date('2024-12-04'),
      reviewers: ['snehagoyal-wg', 'afeefashraf-wg']
    }
  ];

  dataSource = new MatTableDataSource<PullRequest>(this.pullRequests);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStatusColor(status: string): string {
    switch (status as ReviewStatusEnum) {
      case ReviewStatusEnum.Open:
        return 'status-open';
      case ReviewStatusEnum.InReview:
        return 'status-inreview';
      case ReviewStatusEnum.RequestChanges:
        return 'status-requestchanges';
      case ReviewStatusEnum.Approved:
        return 'status-approved';
    }
  }
}

export interface PullRequest {
  title: string;
  author: string;
  url: string;
  repository: string;
  status: ReviewStatusEnum;
  addedDate: Date;
  reviewers: Array<string>;
}

export enum ReviewStatusEnum {
  Open = 'Open',
  InReview = 'In Review',
  RequestChanges = 'Request Changes',
  Approved = 'Approved'
}