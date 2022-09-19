import { Component, OnInit } from '@angular/core';
//
import { User } from '../interfaces';
import { UserService, AuthService } from '../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';


@Component({ 
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  user: User;
  userFromApi : User;
  edit: boolean = false;
  response: string = '';

  constructor(private userService: UserService, private auth: AuthService, private modalService: NgbModal,) {
    this.user = this.auth.userValue;
  }

  ngOnInit() {
    this.loading = true;

    this.userFromApi = this.user;
    this.loading = false;
  }
  openEditModal() {
    this.edit = true;
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.componentInstance.edit = this.edit;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.clickevent.subscribe((res) => {
      this.response = res;
    })
  }
  delete() {
    this.userService.delete(this.user.id).subscribe((res) => {
      this.response = res;
    })
  }
}