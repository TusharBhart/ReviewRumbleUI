export interface PullRequest {
  id: number;
  title: string;
  author: Reviewer;
  url: string;
  repository: string;
  status: ReviewStatus;
  addedDate: Date;
  reviewers: Array<Reviewer>;
}

export interface Reviewer {
  id: number,
  username: string
}

export enum ReviewStatus {
  Open = 'Open',
  InReview = 'InReview',
  RequestChanges = 'RequestChanges',
  Approved = 'Approved',
}
