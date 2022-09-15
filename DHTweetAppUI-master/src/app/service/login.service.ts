import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  generateToken(credentials:any) {
    return this.http.post(this.baseUrl + '/tweets/token', credentials)
  }

  loginUser(token: string) {
    localStorage.setItem("token", token)
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === '' || token == null) {
      return false
    } else {
      return true
    }
  }

  logout() {
    localStorage.removeItem("token")
    return true
  }

  getToken() {
    return localStorage.getItem("token")
  }
}
