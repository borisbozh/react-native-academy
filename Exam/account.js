"use strict";
exports.__esModule = true;
exports.User = exports.Status = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles[Roles["USER"] = 0] = "USER";
    Roles[Roles["ADMIN"] = 1] = "ADMIN";
})(Roles = exports.Roles || (exports.Roles = {}));
var Status;
(function (Status) {
    Status[Status["ACTIVE"] = 0] = "ACTIVE";
    Status[Status["SUSPENDED"] = 1] = "SUSPENDED";
    Status[Status["DEACTIVATED"] = 2] = "DEACTIVATED";
})(Status = exports.Status || (exports.Status = {}));
var User = /** @class */ (function () {
    function User(id, firstName, lastName, username, password, gender, user_role, pictureUrl, description, status, timestamp, modification) {
        if (user_role === void 0) { user_role = Roles.USER; }
        if (status === void 0) { status = Status.ACTIVE; }
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.user_role = user_role;
        this.pictureUrl = pictureUrl;
        this.description = description;
        this.status = status;
        this.timestamp = timestamp;
        this.modification = modification;
    }
    return User;
}());
exports.User = User;
