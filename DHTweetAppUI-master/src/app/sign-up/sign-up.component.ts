import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Users } from '../model/users';
import { UsersService } from '../service/users.service';
// import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [MessageService]
})
export class SignUpComponent implements OnInit {

  users: Users;
  genders: any[]
  genderValue: boolean = false;
  dobValue: boolean = false;
  emailValue: boolean = false;
  userFound: boolean = false;
  maxDate: Date = new Date();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.users = new Users();
    this.genders = [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Others", value: "Others" },
    ];
  }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(): void {
    this.users = new Users();
  }

  onChangeOfDate() {
    if (this.users.dob == "" || this.users.dob == null) {
      this.dobValue = true
    } else {
      this.dobValue = false
    }
  }

  onChangeOfGender() {
    if (this.users.gender == "" || this.users.gender == null) {
      this.genderValue = true
    } else {
      this.genderValue = false
    }
  }

  validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  save() {
    console.log(this.users.gender)
    if (this.users.gender == "" || this.users.gender == null) {
      this.genderValue = true
    } else {
      this.genderValue = false
    }
    console.log(this.genderValue)

    console.log(this.users.dob)
    if (this.users.dob == "" || this.users.dob == null) {
      this.dobValue = true
    } else {
      this.dobValue = false
    }
    console.log(this.dobValue)

    if (this.validateEmail(this.users.userName) == true) {
      this.emailValue = false
    } else {
      this.emailValue = true
    }

    this.usersService.getUser(this.users.userName).subscribe((result: Users) => {
      if (!!result) {
        console.log(result)
        this.userFound = true
      } else {
        if (this.dobValue == false && this.genderValue == false && this.emailValue == false) {
          this.usersService.saveNewUser(this.users).subscribe(
            (result: any) => {
              console.log(result)
              this.registrationSuccessful()
            }
          );
        }
      }
    })
  }

  registrationSuccessful() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration Successful' });
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 500);
  }

}
