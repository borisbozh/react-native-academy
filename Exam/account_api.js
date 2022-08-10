var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Roles;
(function (Roles) {
    Roles[Roles["USER"] = 0] = "USER";
    Roles[Roles["ADMIN"] = 1] = "ADMIN";
})(Roles || (Roles = {}));
var Status;
(function (Status) {
    Status[Status["ACTIVE"] = 0] = "ACTIVE";
    Status[Status["SUSPENDED"] = 1] = "SUSPENDED";
    Status[Status["DEACTIVATED"] = 2] = "DEACTIVATED";
})(Status || (Status = {}));
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
var API_BASE_URL = "http://localhost:4000/api/accounts";
var BlogsController = /** @class */ (function () {
    function BlogsController() {
        var _this = this;
        this.postsSection = document.getElementById("posts");
        this.erorrsDiv = document.getElementById("errors");
        this.addPostForm = document.getElementById("add-post-form");
        this.handleSubmitPost = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var post, updated, created, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log(2);
                        event.preventDefault();
                        post = this.getPostFormSnapshot();
                        if (!post.id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updatePost(post)];
                    case 1:
                        updated = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.addNewPost(post)];
                    case 3:
                        created = _a.sent();
                        this.resetForm();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        this.showError(err_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.resetForm = function () {
            _this.addPostForm.reset();
        };
    }
    BlogsController.prototype.doStuff = function () {
        var _this = this;
        document.getElementById("posts").innerHTML = "\n        <div class=\"row\">\n            <form id=\"login-form\">\n                      <div class=\"input\">\n                          <input id=\"username_login\" name=\"username_login\" type=\"text\" class=\"validate\">\n                          <label for=\"username\">Username</label>\n                      </div>\n                  </div>\n                  <div class=\"row\">\n                    <div class=\"input\">\n                        <input id=\"password_login\" name=\"password_login\" type=\"text\" class=\"validate\">\n                        <label for=\"password\">Password</label>\n                    </div>\n                </div>\n                <div id=\"wrong\">\n                </div>\n                <button class=\"btn waves-effect waves-light\" id=\"login\">Log In</button>\n            </form>\n        </div>\n";
        document
            .getElementById("login")
            .addEventListener("click", function (event) { return _this.login(); });
    };
    BlogsController.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var addPostForm, name, pass, users, count, _i, _a, x;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        addPostForm = document.getElementById("login-form");
                        name = addPostForm.elements["username_login"].value;
                        pass = document.getElementById("password_login").value;
                        users = this.getAllUsers();
                        count = 0;
                        _i = 0;
                        return [4 /*yield*/, users];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        x = _a[_i];
                        if (x.username === name && x.password === pass) {
                            document.getElementById("wrong").innerHTML = "";
                            this.login_msg(x);
                            count = 1;
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 2];
                    case 4:
                        if (count === 0) {
                            document.getElementById("wrong").innerHTML = "\n            <div>Wrong credentials</div>\n            ";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlogsController.prototype.login_msg = function (x) {
        var _this = this;
        document.getElementById("posts").innerHTML = "\n        <div class=\"row\">\n                      <h2 class=\"new\">\n                          GOOD JOB!\n                      </h2>\n                  </div>\n                  <div class=\"row\">\n                    <h3 class=\"new\">\n                        YOU LOGGED IN,  ".concat(x.username, " WITH ROLE ").concat(Roles[x.user_role], "\n                    </h3>\n                    <button class=\"btn waves-effect waves-light red lighten-1\" id=\"logout\">Log Out</button>\n                    <button class=\"btn waves-effect waves-light\" id=\"edit\">Edit</button>\n        </div>\n");
        document
            .getElementById("logout")
            .addEventListener("click", function (event) { return _this.doStuff(); });
        document
            .getElementById("edit")
            .addEventListener("click", function (event) { return _this.editPost(x); });
    };
    BlogsController.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.addPostForm.addEventListener('submit', this.handleSubmitPost);
                this.doStuff();
                return [2 /*return*/];
            });
        });
    };
    BlogsController.prototype.showError = function (err) {
        this.erorrsDiv.innerHTML = "<div>".concat(err, "</div>");
    };
    BlogsController.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postsResp, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(API_BASE_URL)];
                    case 1:
                        postsResp = _a.sent();
                        if (postsResp.status >= 400) {
                            return [2 /*return*/, Promise.reject(postsResp.body)];
                        }
                        return [2 /*return*/, postsResp.json()];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BlogsController.prototype.editPost = function (post) {
        console.log("no time");
        //   this.fillPostForm(post);
    };
    BlogsController.prototype.fillPostForm = function (post) {
        var field;
        for (field in post) {
            document.getElementById(field).value = post[field];
            var label = document.querySelector("#add-post-form label[for=".concat(field, "]"));
            if (label) {
                label.className = 'active';
            }
        }
    };
    BlogsController.prototype.getPostFormSnapshot = function () {
        var formData = new FormData(this.addPostForm);
        var np = {};
        formData.forEach(function (value, key) {
            np[key] = value.toString();
        });
        return new User(parseInt(np.id), np.firstName, np.lastName, np.username, np.password, np.gender, Roles.USER, np.pictureUrl, np.description, Status.ACTIVE, new Date(), new Date());
    };
    BlogsController.prototype.updatePost = function (post) {
        console.log("no time");
    };
    BlogsController.prototype.addNewPost = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(6);
                return [2 /*return*/, this.handleRequest("".concat(API_BASE_URL), {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })];
            });
        });
    };
    BlogsController.prototype.handleRequest = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var postsResp, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(url, options)];
                    case 1:
                        postsResp = _a.sent();
                        if (postsResp.status >= 400) {
                            return [2 /*return*/, Promise.reject(postsResp.body)];
                        }
                        return [2 /*return*/, postsResp.json()];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(err_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BlogsController.prototype.deletePostById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.handleRequest("".concat(API_BASE_URL, "/").concat(id), {
                        method: 'DELETE'
                    })];
            });
        });
    };
    BlogsController.prototype.deletePost = function (postId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deletePostById(postId)];
                    case 1:
                        _b.sent();
                        (_a = document.getElementById(postId.toString())) === null || _a === void 0 ? void 0 : _a.remove();
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _b.sent();
                        this.showError(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BlogsController;
}());
var blogsController = new BlogsController();
blogsController.init();
