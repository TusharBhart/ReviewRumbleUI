import { TestBed } from '@angular/core/testing';

import { ReviewRumbleApiService } from './review-rumble-api.service';

describe('ReviewRumbleApiService', () => {
  let service: ReviewRumbleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewRumbleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
