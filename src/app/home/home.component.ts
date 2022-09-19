import { Component, OnInit } from '@angular/core';
//
import { User } from '../interfaces';
import { UserService, AuthService } from '../services';


@Component({ 
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  user: User;
  userFromApi : User;

  constructor(private userService : UserService, private auth: AuthService) {
    this.user = this.auth.userValue;
  }

  ngOnInit() {
    this.loading = true;

    this.userFromApi = this.user;
    /* this.userService.getById(this.user.id).subscribe(user => {
      this.userFromApi= this.user;
    }) */
    this.loading = false;
    //console.log(this.userFromApi);
    //console.log(this.user);
  }
}