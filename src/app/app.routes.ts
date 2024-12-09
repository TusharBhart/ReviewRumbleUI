import { Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/auth/auth.guard';
import { LeaderboardComponent } from './home/leaderboard/leaderboard.component';
import { PullRequestsTableComponent } from './home/pull-requests/pull-requests-table/pull-requests-table.component';
import { userResolver } from './core/user.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        canActivate: [authGuard],
        component: HomeComponent,
        resolve: { user: userResolver },
        children: [
            { path: '', redirectTo: 'assigned-pull-requests', pathMatch: 'full' },
            { path: 'assigned-pull-requests', component: PullRequestsTableComponent },
            { path: 'my-pull-requests', component: PullRequestsTableComponent },
            { path: 'all-pull-requests', component: PullRequestsTableComponent },
            { path: 'leaderboard', component: LeaderboardComponent },
        ]
    },
    { path: 'callback', component: CallbackComponent }
];
