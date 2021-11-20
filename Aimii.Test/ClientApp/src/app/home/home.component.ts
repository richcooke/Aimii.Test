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
  http: HttpClient;
  baseUrl: string;

  search = '';
  output = '';
  showResults: boolean = false;
  filter = [];
  json = '';
  selected = '';

  constructor(
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.getUsers();
  }
  
  onUserInput(event) {
    this.search = event.target.value;
    if (this.search.length >= 2) {
      this.getUsers();
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

  getUsers() {
    this.http.get<User[]>(this.baseUrl + 'home').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
    //Filter this.users with selectedUsers list to reset
    if (this.selectedUsers.length > 0) {
      var filter = filterObjectArray(this.users, this.selectedUsers);
      this.users = filter;
    }
  }

  updateUserList(users) {
    this.users = users;
  }
}

const filterObjectArray = (arr, filterArr) => (
  arr.filter(el =>
    filterArr.some(f =>
      ////f !== el
      f.firstName !== el.firstName && f.lastName !== el.lastName && f.jobTitle !== el.jobTitle && f.phone !== el.phone && f.email !== el.email
    )
  )
);

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
