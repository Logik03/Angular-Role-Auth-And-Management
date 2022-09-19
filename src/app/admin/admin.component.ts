import {Component, OnInit, ViewChild } from '@angular/core';
//
import { User } from '../interfaces';
import { UserService } from '../services';
import { CreateComponent } from '../create/create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({ 
  templateUrl: 'admin.component.html', 
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading = false;
  response : string;
  users : User[] = [];
  @ViewChild('modal', { static: false }) modal: CreateComponent

  constructor(private userService: UserService, private modalService: NgbModal) {
    
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().subscribe(users => {
      this.loading = false;
      this.users = users;
    })
  }
  openCreateModal() {
    //console.log('i got clicked');
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.componentInstance.clickevent.subscribe((res) => {
      this.response = res;
    })
  }
}