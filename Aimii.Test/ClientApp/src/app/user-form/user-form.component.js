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
exports.UserFormComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var User_1 = require("../User");
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(http, baseUrl) {
        this.updateUserList = new core_1.EventEmitter();
        this.user = new User_1.User();
        this.showCreateNewUser = false;
        this.showNewUserAdded = false;
        this.showErrorMessage = false;
        this.userForm = new forms_1.FormGroup({
            userFirstName: new forms_1.FormControl(""),
            userLastName: new forms_1.FormControl(""),
            userJobTitle: new forms_1.FormControl(""),
            userEmail: new forms_1.FormControl(""),
            userPhone: new forms_1.FormControl("")
        });
        this.http = http;
        this.baseUrl = baseUrl;
    }
    UserFormComponent.prototype.ngOnInit = function () {
    };
    UserFormComponent.prototype.toggleCreateNewUser = function () {
        this.showCreateNewUser = !this.showCreateNewUser;
    };
    UserFormComponent.prototype.validateUserForm = function () {
        var _this = this;
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
        var duplicate = this.allUsers.filter(function (f) { return f.firstName === _this.user.firstName &&
            f.lastName === _this.user.lastName &&
            f.jobTitle === _this.user.jobTitle &&
            f.phone === _this.user.phone &&
            f.email === _this.user.email; });
        if (duplicate.length > 0) {
            this.showErrorMessageBox("ERROR: New user is a duplicate record");
            return false;
        }
        return true;
    };
    UserFormComponent.prototype.validatePhone = function (phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone).toLowerCase());
    };
    UserFormComponent.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    UserFormComponent.prototype.onFormSubmit = function () {
        var _this = this;
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
            this.http.post(this.baseUrl + 'userform', this.user).subscribe(function (result) {
                _this.currentUsers = result;
                _this.showCreateNewUser = false;
                _this.updateUserList.emit();
                _this.showMessageSuccess();
                _this.userForm.get("userFirstName").setValue('');
                _this.userForm.get("userLastName").setValue('');
                _this.userForm.get("userJobTitle").setValue('');
                _this.userForm.get("userEmail").setValue('');
                _this.userForm.get("userPhone").setValue('');
            }, function (error) { return console.error(error); });
        }
    };
    UserFormComponent.prototype.showMessageSuccess = function () {
        var _this = this;
        this.showNewUserAdded = true;
        setTimeout(function () {
            _this.showNewUserAdded = false;
        }, 3000);
    };
    UserFormComponent.prototype.showErrorMessageBox = function (errorMessage) {
        var _this = this;
        this.errorMessage = errorMessage;
        this.showErrorMessage = true;
        setTimeout(function () {
            _this.showErrorMessage = false;
        }, 3000);
    };
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", Object)
    ], UserFormComponent.prototype, "currentUsers", void 0);
    __decorate([
        (0, core_1.Input)(),
        __metadata("design:type", Object)
    ], UserFormComponent.prototype, "allUsers", void 0);
    __decorate([
        (0, core_1.Output)(),
        __metadata("design:type", Object)
    ], UserFormComponent.prototype, "updateUserList", void 0);
    UserFormComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-user-form',
            templateUrl: './user-form.component.html',
            styleUrls: ['./user-form.component.css']
        }),
        __param(1, (0, core_1.Inject)('BASE_URL')),
        __metadata("design:paramtypes", [http_1.HttpClient, String])
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map