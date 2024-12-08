import { ResolveFn } from '@angular/router';
import { ReviewRumbleApiService } from './review-rumble-api/review-rumble-api.service';
import { inject } from '@angular/core';
import { User } from './review-rumble-api/models/user.model';

export const userResolver: ResolveFn<User> = (route, state) => {
  const reviewRumbleApi = inject(ReviewRumbleApiService);

  return reviewRumbleApi.getUser();
};
