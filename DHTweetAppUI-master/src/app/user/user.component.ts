import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Users } from '../model/users';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usersList: Users[] = [];
  users: Users;
  userSearch: string = ""
  userFound: boolean = false

  constructor(private usersService: UsersService,
    private router: Router,
    private cookieService: CookieService) {
    this.users = new Users();
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe((results: Users[]) => {
      if (results) {
        this.usersList = results;
      }
    });
  }

  userSearching(){
    if(this.userSearch==""){
      this.userFound = false
    }
  }

  findUser() {
    this.usersService.getUser(this.userSearch).subscribe((result: Users) => {
      if (!!result) {
        this.users = result
        this.userFound = false
      } else {
        this.users = new Users();
        this.userFound = true
      }
    })
  }

}
