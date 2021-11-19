import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public users: User[];
  newUsers: User[];
  public selectedUsers: User[] = [];
  public user = new User();

  constructor(
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<User[]>(baseUrl + 'home').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  search = '';
  output = '';
  showResults: boolean = false;
  filter = [];
  json = '';
  selected = '';
  
  onUserInput(event) {
    this.search = event.target.value;
    if (this.search.length >= 2) {
      //Do filter
      this.filter = filterByValue(this.users, this.search);
      this.showResults = false;
      if (this.filter.length > 0) {
        this.showResults = true;
      }
    } else {
      this.showResults = false;
    }
  }

  onClickResult(user) {
    this.users = this.users.filter(x => x !== user);
    this.selectedUsers.push(user);
    this.search = '';
    this.showResults = false;
  }

  updateUserList(users) {
    this.users = users;
  }
}


const filterByValue = (arr = [], query = '') => {
  const reg = new RegExp(query, 'i');
  return arr.filter((item) => {
    let flag = false;
    for (let prop in item) {
      if (prop === "firstName" || prop === "lastName") {
        if (reg.test(item[prop])) {
          flag = true;
        }
      }
    };
    return flag;
  });
};
