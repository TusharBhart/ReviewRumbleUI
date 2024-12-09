import { Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/auth/auth.guard';
import { LeaderboardComponent } from './home/leaderboard/leaderboard.component';
import { PullRequestsTableComponent } from './home/pull-requests/pull-requests-table/pull-requests-table.component';
import { userResolver } from './core/user.resolver';
import { AssignedPullRequestsComponent } from './home/pull-requests/assigned-pull-requests/assigned-pull-requests.component';
import { MyPullRequestsComponent } from './home/pull-requests/my-pull-requests/my-pull-requests.component';
import { AllPullRequestsComponent } from './home/pull-requests/all-pull-requests/all-pull-requests.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        canActivate: [authGuard],
        component: HomeComponent,
        resolve: { user: userResolver },
        children: [
            { path: '', redirectTo: 'assigned-pull-requests', pathMatch: 'full' },
            { path: 'assigned-pull-requests', component: AssignedPullRequestsComponent },
            { path: 'my-pull-requests', component: MyPullRequestsComponent },
            { path: 'all-pull-requests', component: AllPullRequestsComponent },
            { path: 'leaderboard', component: LeaderboardComponent },
        ]
    },
    { path: 'callback', component: CallbackComponent }
];
