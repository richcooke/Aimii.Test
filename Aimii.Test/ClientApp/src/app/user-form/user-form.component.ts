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
  @Output() updateUserList = new EventEmitter<User[]>();
  ////users: User[];
  http: HttpClient;
  baseUrl: string;
  user: User = new User();

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  showCreateNewUser: boolean = false;
  showNewUserAdded: boolean = false;

  userForm = new FormGroup({
    userFirstName: new FormControl("", Validators.required),
    userLastName: new FormControl("", Validators.required),
    userJobTitle: new FormControl("", Validators.required),
    userEmail: new FormControl("", Validators.required),
    userPhone: new FormControl("", Validators.required)
  });

  ngOnInit() {
  }

  toggleCreateNewUser() {
    this.showCreateNewUser = !this.showCreateNewUser;
  }

  onFormSubmit(): void {
    console.log('userFirstName:' + this.userForm.get("userFirstName").value);
    console.log('userLastName:' + this.userForm.get("userLastName").value);
    console.log('userJobTitle:' + this.userForm.get("userJobTitle").value);
    console.log('userEmail:' + this.userForm.get("userEmail").value);
    console.log('userPhone:' + this.userForm.get("userPhone").value);
    
    this.user.firstName = this.userForm.get("userFirstName").value;
    this.user.lastName = this.userForm.get("userLastName").value;
    this.user.jobTitle = this.userForm.get("userJobTitle").value;
    this.user.email = this.userForm.get("userEmail").value;
    this.user.phone = this.userForm.get("userPhone").value;
    
    //Post user object to UserFormController/Create
    this.http.post<User[]>(this.baseUrl + 'userform', this.user).subscribe(result => {
      this.currentUsers = result;

      this.showCreateNewUser = false;
      ////this.updateUserList.emit(this.currentUsers);
      this.showMessageSuccess();

      this.userForm.get("userFirstName").setValue('');
      this.userForm.get("userLastName").setValue('');
      this.userForm.get("userJobTitle").setValue('');
      this.userForm.get("userEmail").setValue('');
      this.userForm.get("userPhone").setValue('');
    }, error => console.error(error));
  }

  showMessageSuccess() {

    this.showNewUserAdded = true;

    setTimeout(() => {
      this.showNewUserAdded = false;
    }, 3000);

  }
}

