import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeComponent } from "../home/home.component";
import { User } from '../User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() currentUsers;
  @Input() allUsers;
  @Output() updateUserList = new EventEmitter<User[]>();
  ////users: User[];
  http: HttpClient;
  baseUrl: string;
  user: User = new User();
  errorMessage: string;


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  showCreateNewUser: boolean = false;
  showNewUserAdded: boolean = false;
  showErrorMessage: boolean = false;

  userForm = new FormGroup({
    userFirstName: new FormControl(""),
    userLastName: new FormControl(""),
    userJobTitle: new FormControl(""),
    userEmail: new FormControl(""),
    userPhone: new FormControl("")
  });

  ngOnInit() {
  }

  toggleCreateNewUser() {
    this.showCreateNewUser = !this.showCreateNewUser;
  }

  validateUserForm(): boolean {
    if (this.user.firstName.length === 0 ||
        this.user.lastName.length === 0 ||
        this.user.jobTitle.length === 0 ||
        this.user.phone.length === 0 ||
        this.user.email.length === 0) {
      this.showErrorMessageBox("ERROR: All fields must have a value");
      return false;
    }

    if (!this.validatePhone(this.user.phone.replace(/ /g, ""))) {
      this.showErrorMessageBox("ERROR: Phone number must be valid");
      return false;
    }

    if (!this.validateEmail(this.user.email)) {
      this.showErrorMessageBox("ERROR: Email address must be valid");
      return false;
    }

    var duplicate = this.allUsers.filter(f => f.firstName === this.user.firstName &&
      f.lastName === this.user.lastName &&
      f.jobTitle === this.user.jobTitle &&
      f.phone === this.user.phone &&
      f.email === this.user.email);
    
    if (duplicate.length > 0) {
      this.showErrorMessageBox("ERROR: New user is a duplicate record");
      return false;
    }

    return true;
  }
  
  validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone).toLowerCase());
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onFormSubmit() {
    
    console.log('userFirstName:' + this.userForm.get("userFirstName").value);
    console.log('userLastName:' + this.userForm.get("userLastName").value);
    console.log('userJobTitle:' + this.userForm.get("userJobTitle").value);
    console.log('userEmail:' + this.userForm.get("userEmail").value);
    console.log('userPhone:' + this.userForm.get("userPhone").value);
    
    this.user.firstName = this.userForm.get("userFirstName").value.trim();
    this.user.lastName = this.userForm.get("userLastName").value.trim();
    this.user.jobTitle = this.userForm.get("userJobTitle").value.trim();
    this.user.email = this.userForm.get("userEmail").value.trim();
    this.user.phone = this.userForm.get("userPhone").value.trim();

    if (this.validateUserForm()) {
    //Post user object to UserFormController/Create
    this.http.post<User[]>(this.baseUrl + 'userform', this.user).subscribe(result => {
      this.currentUsers = result;

      this.showCreateNewUser = false;
      this.updateUserList.emit();
      this.showMessageSuccess();

      this.userForm.get("userFirstName").setValue('');
      this.userForm.get("userLastName").setValue('');
      this.userForm.get("userJobTitle").setValue('');
      this.userForm.get("userEmail").setValue('');
      this.userForm.get("userPhone").setValue('');
    }, error => console.error(error));
    }
  }

  showMessageSuccess() {
    this.showNewUserAdded = true;
    setTimeout(() => {
      this.showNewUserAdded = false;
    }, 3000);
  }

  showErrorMessageBox(errorMessage) {
    this.errorMessage = errorMessage;
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }
}

