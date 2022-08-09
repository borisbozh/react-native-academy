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
var API_BASE_URL = "http://localhost:4000/api/books";
var getBookElement = function (book, number) {
    if (number === void 0) { number = 0; }
    var bookElem = document.createElement("div");
    bookElem.setAttribute("books", book["class"]);
    if (number === 0) {
        bookElem.setAttribute("id", book.id);
        bookElem.innerHTML = "\n      <h1 id=\"idk\">".concat(book.volumeInfo.title, "</h1>\n      <img class=\"image\" src=\"").concat(book.volumeInfo.imageLinks.thumbnail, "\" width=\"autp\" height=\"300\">\n      <figcaption>").concat(book.volumeInfo.authors, "</figcaption>\n      <p>").concat(book.volumeInfo.description === undefined
            ? "There is no description"
            : book.volumeInfo.description.slice(0, 500), "...</p>\n      <button id=\"addfavorites").concat(book.id, "\">Add to Favorites</button>\n      ");
    }
    else {
        bookElem.setAttribute("id", book.id);
        bookElem.innerHTML = "\n        <h1 id=\"idk\">".concat(book.volumeInfo.title, "</h1>\n        <img class=\"image\" src=\"").concat(book.volumeInfo.imageLinks.thumbnail, "\" width=\"autp\" height=\"300\">\n        <figcaption>").concat(book.volumeInfo.authors, "</figcaption>\n        <p>").concat(book.volumeInfo.description === undefined
            ? "There is not description"
            : book.volumeInfo.description.slice(0, 500), "...</p>\n        <button id=\"removefavorites").concat(book.id, "\">Remove from Favorites</button>\n        ");
    }
    if (number === 0) {
        bookElem
            .querySelector("#addfavorites".concat(book.id))
            .addEventListener("click", function (event) { return addToFavorites(event, book); });
    }
    else if (number === 2) {
        bookElem
            .querySelector("#removefavorites".concat(book.id))
            .addEventListener("click", function (event) { return removeFromFavorites2(event, book); });
    }
    else if (number === 1) {
        bookElem
            .querySelector("#removefavorites".concat(book.id))
            .addEventListener("click", function (event) { return removeFromFavorites(event, book); });
    }
    return bookElem;
};
function init(book) {
    if (book === void 0) { book = "levski"; }
    return __awaiter(this, void 0, void 0, function () {
        var resultsElem_1, booksResp, books, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    resultsElem_1 = document.getElementById("results");
                    return [4 /*yield*/, fetch("https://www.googleapis.com/books/v1/volumes?q=".concat(encodeURIComponent(book)))];
                case 1:
                    booksResp = _a.sent();
                    return [4 /*yield*/, booksResp.json()];
                case 2:
                    books = _a.sent();
                    console.log(books);
                    resultsElem_1.innerHTML = "";
                    books.items.forEach(function (book) { return __awaiter(_this, void 0, void 0, function () {
                        var num;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, random(book)];
                                case 1:
                                    num = _a.sent();
                                    resultsElem_1.appendChild(getBookElement(book, num));
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Error", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function random(book) {
    return __awaiter(this, void 0, void 0, function () {
        var books, _i, _a, x;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    books = getAllBooks();
                    _i = 0;
                    return [4 /*yield*/, books];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x = _a[_i];
                    if (x.id === book.id) {
                        return [2 /*return*/, 2];
                    }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/, 0];
            }
        });
    });
}
function myFunction(event) {
    event.preventDefault();
    var book = document.getElementById("bar").value;
    if (book.length === 0) {
        book = "levski";
    }
    init(book);
}
function addToFavorites(event, book) {
    return __awaiter(this, void 0, void 0, function () {
        var postsResp, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    console.log(333);
                    document.getElementById(book.id).innerHTML = "\n  <h1 id=\"idk\">".concat(book.volumeInfo.title, "</h1>\n        <img class=\"image\" src=\"").concat(book.volumeInfo.imageLinks.thumbnail, "\" width=\"autp\" height=\"300\">\n        <figcaption>").concat(book.volumeInfo.authors, "</figcaption>\n        <p>").concat(book.volumeInfo.description === undefined
                        ? "There is not description"
                        : book.volumeInfo.description.slice(0, 500), "...</p>\n        <button id=\"removefavorites").concat(book.id, "\">Remove from Favorites</button>\n  ");
                    document
                        .getElementById("removefavorites".concat(book.id))
                        .addEventListener("click", function (event) { return removeFromFavorites2(event, book); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(API_BASE_URL, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(book)
                        })];
                case 2:
                    postsResp = _a.sent();
                    if (postsResp.status >= 400) {
                        return [2 /*return*/, Promise.reject(postsResp.body)];
                    }
                    return [2 /*return*/, postsResp.json()];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function removeFromFavorites2(event, book) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    console.log(0);
                    document.getElementById(book.id).innerHTML = "\n<h1 id=\"idk\">".concat(book.volumeInfo.title, "</h1>\n      <img class=\"image\" src=\"").concat(book.volumeInfo.imageLinks.thumbnail, "\" width=\"autp\" height=\"300\">\n      <figcaption>").concat(book.volumeInfo.authors, "</figcaption>\n      <p>").concat(book.volumeInfo.description === undefined
                        ? "There is not description"
                        : book.volumeInfo.description.slice(0, 500), "...</p>\n      <button id=\"addfavorites").concat(book.id, "\">Add to Favorites</button>\n");
                    document
                        .getElementById("addfavorites".concat(book.id))
                        .addEventListener("click", function (event) { return addToFavorites(event, book); });
                    return [4 /*yield*/, fetch("http://localhost:4000/api/books/" + book.id, {
                            method: "DELETE"
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeFromFavorites(event, book) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, fetch("http://localhost:4000/api/books/" + book.id, {
                            method: "DELETE"
                        })];
                case 1:
                    _a.sent();
                    document.getElementById(book.id).remove();
                    return [2 /*return*/];
            }
        });
    });
}
function getAllBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var postsResp, err_3;
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
                    err_3 = _a.sent();
                    return [2 /*return*/, Promise.reject(err_3)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function myFavorites(event) {
    return __awaiter(this, void 0, void 0, function () {
        var resultsElem_2, books, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    resultsElem_2 = document.getElementById("results");
                    return [4 /*yield*/, getAllBooks()];
                case 1:
                    books = _a.sent();
                    console.log(books);
                    resultsElem_2.innerHTML = "";
                    books.forEach(function (book) {
                        resultsElem_2.appendChild(getBookElement(book, 1));
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.log("Error", err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
init("apple");
