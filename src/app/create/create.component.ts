import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services';



@Component({
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal: ElementRef;
  closeResult = '';
  registerForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private userservice:UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  open() {
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  onSubmit($event) {
    const formValue = this.registerForm.value;
    this.userservice.update(5, formValue)
    .subscribe( response => {
       console.log(response);
    });
  }
}