export interface PullRequest {
  title: string;
  author: string;
  url: string;
  repository: string;
  status: ReviewStatus;
  addedDate: Date;
  reviewers: Array<string>;
}

export enum ReviewStatus {
  Open = 'Open',
  InReview = 'In Review',
  RequestChanges = 'Request Changes',
  Approved = 'Approved',
}
