export interface User {
    id: number,
    username: string,
    status: UserStatus,
    totalReviewsCount: number,
}

export enum UserStatus {
    Active = 'Active',
    Inactive = 'Inactive'
}