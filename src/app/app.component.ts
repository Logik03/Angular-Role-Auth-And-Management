import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services';
import { User, Role } from './interfaces';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  user : User;

  constructor(private auth: AuthService) {
    this.auth.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.auth.logout();
  }
}
