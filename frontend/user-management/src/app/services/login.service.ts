import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  TOKEN_KEY = "accessToken"
  baseUrl : string = "http://localhost:8080/api/v1/auth";
  currentUser = new BehaviorSubject(null);
  actionSubject = new BehaviorSubject(null);
  constructor(private _http: HttpClient) {
      
   }

   login(username: string, password : string) {
    return this._http.post<any>(this.baseUrl + "/login", { username, password });
   }

   getLoggedInUser() {
    return this._http.get(this.baseUrl + "/user/details")
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setCurrentUser(user: any) {
    this.currentUser.next(user)
  }

  getCurrentUser() {
    return this.currentUser.getValue();
  }

  setActions(actions: any) {
     this.actionSubject.next(actions);
  }

  getActions() {
    return this.actionSubject.getValue();
  }

  

}
