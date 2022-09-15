import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './service/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TweetHomeComponent } from './tweet-home/tweet-home.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'tweet-home', component: TweetHomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent, UserComponent, SignUpComponent,
  PasswordResetComponent, TweetHomeComponent, AccessDeniedComponent, NotFoundComponent]