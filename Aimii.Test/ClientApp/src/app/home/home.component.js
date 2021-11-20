"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var User_1 = require("../User");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http, baseUrl) {
        this.selectedUsers = [];
        this.user = new User_1.User();
        this.search = '';
        this.output = '';
        this.showResults = false;
        this.filter = [];
        this.json = '';
        this.selected = '';
        this.http = http;
        this.baseUrl = baseUrl;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    HomeComponent.prototype.onUserInput = function (event) {
        this.search = event.target.value;
        if (this.search.length >= 2) {
            this.getUsers();
            this.filter = filterByValue(this.users, this.search);
            this.showResults = false;
            if (this.filter.length > 0) {
                this.showResults = true;
            }
        }
        else {
            this.showResults = false;
        }
    };
    HomeComponent.prototype.onClickResult = function (user) {
        this.users = this.users.filter(function (x) { return x !== user; });
        this.selectedUsers.push(user);
        this.search = '';
        this.showResults = false;
    };
    HomeComponent.prototype.getUsers = function () {
        var _this = this;
        this.http.get(this.baseUrl + 'home').subscribe(function (result) {
            _this.users = result;
        }, function (error) { return console.error(error); });
        //Filter this.users with selectedUsers list to reset
        if (this.selectedUsers.length > 0) {
            var filter = filterObjectArray(this.users, this.selectedUsers);
            this.users = filter;
        }
    };
    HomeComponent.prototype.updateUserList = function (users) {
        this.users = users;
    };
    HomeComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-home',
            templateUrl: './home.component.html',
        }),
        __param(1, (0, core_1.Inject)('BASE_URL')),
        __metadata("design:paramtypes", [http_1.HttpClient, String])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
var filterObjectArray = function (arr, filterArr) { return (arr.filter(function (el) {
    return filterArr.some(function (f) {
        ////f !== el
        return f.firstName !== el.firstName && f.lastName !== el.lastName && f.jobTitle !== el.jobTitle && f.phone !== el.phone && f.email !== el.email;
    });
})); };
var filterByValue = function (arr, query) {
    if (arr === void 0) { arr = []; }
    if (query === void 0) { query = ''; }
    var reg = new RegExp(query, 'i');
    return arr.filter(function (item) {
        var flag = false;
        for (var prop in item) {
            if (prop === "firstName" || prop === "lastName") {
                if (reg.test(item[prop])) {
                    flag = true;
                }
            }
        }
        ;
        return flag;
    });
};
//# sourceMappingURL=home.component.js.map