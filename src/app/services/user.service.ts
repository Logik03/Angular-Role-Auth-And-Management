import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }
  create(data: any) {
    return this.http.post<User>(`${environment.apiUrl}/users/register`, {data})
  }
  /* create(username: string, password:string, firstName: string, lastName:string, role:string ) {
    return this.http.post<User>(`${ environment.apiUrl }/users/create` , {username, password,firstName,lastName,role})
  } */
  update(id: number, data:any) {
    return this.http.put<User>(`${environment.apiUrl}/users/update/${id}` , {data});
  }

  delete(id:number) {
    return this.http.delete<User>(`${environment.apiUrl}/users/delete/${id}`);
  }
}