import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  public users: User[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<User[]>(baseUrl + 'home').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }
}

interface User {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
}
