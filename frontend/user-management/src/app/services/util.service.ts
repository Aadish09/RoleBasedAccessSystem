import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  TOKEN_KEY = "accessToken"
  baseUrl : string = "http://localhost:8080/api/v1/"
  constructor(private _http: HttpClient) {
      
   }

  fetchUsers() {
    return this._http.get(this.baseUrl + "users", {});
  }

  getUserDetails(id: number) {
    return this._http.get(this.baseUrl + "users/" + id, {});
  }

  fetchPermissions() {
    return this._http.get(this.baseUrl + "permissions", {});
  }

  fetchRoles() {
    return this._http.get(this.baseUrl + "roles", {});
  }

  createRole(payload: any) {
    return this._http.post(this.baseUrl + "roles", payload);
  }


  updateRole(payload: any) {
    return this._http.put(this.baseUrl + "roles", payload);
  }


  getRoleDetails(id:number) {
    return this._http.get(this.baseUrl + "roles/" + id, {});
  }


  deleteRole(id: any) {
    return this._http.delete(this.baseUrl + "roles/" + id, {});
  }

  createUser(payload: any) {
    return this._http.post(this.baseUrl + "users", payload);
  }

  updateUser(payload: any) {
    return this._http.put(this.baseUrl + "users", payload);
  }

  createPermission(payload: any) {
    return this._http.post(this.baseUrl + "permissions", payload);
  }

  deleteUser(id: number) {
    return this._http.delete(this.baseUrl + "users/" + id, {});
  }

  getActions() {
    return this._http.get<any[]>(this.baseUrl + "actions");
  }

  updateActions(payload: any) {
    return this._http.put<any[]>(this.baseUrl + "actions", payload);
  }


}
