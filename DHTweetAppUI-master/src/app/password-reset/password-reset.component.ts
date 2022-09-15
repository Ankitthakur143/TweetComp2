import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Users } from '../model/users';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
  providers: [MessageService]
})
export class PasswordResetComponent implements OnInit {

  users: Users;
  tempUser: Users;
  correctUser: boolean = false

  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.users = new Users();
    this.tempUser = new Users();
  }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {

  }

  resetPassword() {
    this.usersService.getUser(this.users.userName).subscribe((result: Users) => {
      if (!!result) {
        this.tempUser = result
        if (this.tempUser.firstName == this.users.firstName &&
          this.tempUser.lastName == this.users.lastName &&
          this.tempUser.dob == this.users.dob &&
          this.tempUser.userName == this.users.userName) {
          this.correctUser = true
        } else {
          this.showFailure()
        }
      } else {
        this.showFailure()
      }
    }
    );
  }

  updatePassword() {
    this.usersService.updatePassword(this.users.userName, this.users.password).subscribe((result: Users) => {
      if (!!result) {
        this.showSuccess()
      }
    })
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', sticky: true, summary: 'Success', detail: 'Password reset successful' });
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  showFailure() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong credentials' });
  }

}
