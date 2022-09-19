import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../interfaces';
let users = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
  { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User },
  { id: 3, username: 'test', password: 'test', firstName: 'Testing', lastName: 'Tester', role: Role.User },
  { id: 4, username: 'zenith', password: 'zenith', firstName: 'Zenith', lastName: 'User', role: Role.Admin },
  { id: 5, username: 'revent', password: 'tech', firstName: 'Revent', lastName: 'Technology', role: Role.Admin }
];

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept ( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    
    return navigatedRoute();

    function navigatedRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        
        case url.endsWith('/users/register') && method === 'POST':
          return register();  
        
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        
        case url.match(/\/users\/\d+$/) && method === 'PUT':
          return updateUser(); 

        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();   
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }


    function authenticate() {
      const { username, password } = body;
      const user = users.find(u => u.username === username && u.password === password);
      if(!user) return error('Username or password is incorrect');
        return success({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          token: `fake-jwt-token.${user.id}`
        });
    }

    function register() {
      const user = body

      if (users.find(u => u.username === user.username)) {
        return error('Username "' + user.username + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user.data);
      console.log(users);
      localStorage.setItem('users', JSON.stringify(users));
      return success('a user has been succesfully saved to the database');
    }

    function updateUser() {
      if (!isLoggedIn()) return unauthorized();

      let params = body;
      let user = users.find(u => u.id === idFromUrl());
      // only update password if entered
      if (!params.password) {
        delete params.password;
      }
      // update and save user
      Object.assign(user, params);
      localStorage.setItem('users', JSON.stringify(users));

      return success('You Have Succesfully Edited this User!');
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return success('You have Succesfully Deleted This User');
    }

    function getUsers() {
      if(!isAdmin()) return unauthorized();
      return success(users);
    }
    function getUserById() {
      if(!isLoggedIn()) return unauthorized();
      if(!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();
      const user = users.find(u => u.id === idFromUrl());
    }

    function success (body?) {
      return of(new HttpResponse({ status: 200, body}))
      //.pipe(delay(500));
    }
    function unauthorized() {
      return throwError({ status: 401, error: { message: 'unauthorized' } })
        .pipe(materialize(), delay(500), dematerialize()); 
    }
    function error(message) {
      return throwError({ status: 400, error: { message } })
        .pipe(materialize(), delay(500), dematerialize());
    }
    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }
    function isAdmin() {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }
    function currentUser() {
      if (!isLoggedIn()) return;
      const id = parseInt(headers.get('Authorization').split('.')[1]);
      return users.find(x => x.id === id);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const BackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true
};