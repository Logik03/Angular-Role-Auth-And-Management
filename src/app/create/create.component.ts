import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  templateUrl: 'create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('myModal', { static: false }) modal: ElementRef;
  closeResult = '';
  registerForm: FormGroup;
  @Output() clickevent = new EventEmitter<string>();
  response;


  constructor(
    public activeModal: NgbActiveModal, 
    private userservice:UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
    ) {}
  ngOnInit(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  open() {
    //const modalRef = this.modalService.open(NgbdModal);
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  onSubmit($event) {
    const formValue = this.registerForm.value;
    this.userservice.create(formValue)
    .subscribe( response => {
      this.response = response;
    });
    this.activeModal.dismiss('Cross click')
    this.clickevent.next(this.response);
  }
}