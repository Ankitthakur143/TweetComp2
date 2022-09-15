import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = environment.baseURL;

  constructor(
    private http: HttpClient
  ) { }

  saveNewUser(users: Users) {
    return this.http.post(this.baseUrl + '/tweets/register', users);
  }

  loginUser(users: Users) {
    return this.http.post<Users>(this.baseUrl + '/tweets/login', users);
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + '/tweets/users/all');
  }

  getUser(userName: any): Observable<Users> {
    return this.http.get<Users>(this.baseUrl + '/tweets/user/search/' + userName);
  }

  updatePassword(userName: any, password: any): Observable<Users> {
    return this.http.post<Users>(this.baseUrl + '/tweets/forgot/' + userName , password);
  }
}
