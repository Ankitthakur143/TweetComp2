import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Credentials } from '../model/credentials';
import { Users } from '../model/users';
import { LoginService } from '../service/login.service';
import { UsersService } from '../service/users.service';
import { AppConstant } from '../shared/constant/app.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  credentials: Credentials;
  users: Users;

  constructor(private usersService: UsersService,
    private router: Router,
    private cookieService: CookieService,
    private messageService: MessageService,
    private loginService: LoginService) {
    this.users = new Users();
    this.credentials = new Credentials();
  }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn() == true) {
      window.location.href = '/tweet-home'
    }
  }

  login() {
    this.loginService.generateToken(this.credentials).subscribe(
      (response: any) => {
        console.log(response.token)
        this.cookieService.set(AppConstant.cookieUserKey, this.credentials.userName);
        this.loginService.loginUser(response.token)
        this.loginSuccessful()
      },
      error => {
        console.log(error)
        this.loginUnSuccessful()
      }
    );

  }

  loginUnSuccessful() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Credentials' });
  }

  loginSuccessful() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
    setTimeout(() => {
      // this.router.navigate(['/tweet-home'])
      window.location.href = '/tweet-home'
    }, 500);
  }
}
