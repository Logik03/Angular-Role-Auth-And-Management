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
  update(id: number, data:any) {
    return this.http.put<User>(`${environment.apiUrl}/users/${id}` , {data});
  }

  delete(id:number) {
    return this.http.delete<any>(`${environment.apiUrl}/users/${id}`);
  }
}