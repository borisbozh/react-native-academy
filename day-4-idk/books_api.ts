const API_BASE_URL = "http://localhost:4000/api/books";

const getBookElement = function (book, number = 0) {
  const bookElem = document.createElement("div");
  bookElem.setAttribute("books", book.class);
  if (number === 0) {
    bookElem.setAttribute("id", book.id);
    bookElem.innerHTML = `
      <h1 id="idk">${book.volumeInfo.title}</h1>
      <img class="image" src="${
        book.volumeInfo.imageLinks.thumbnail
      }" width="autp" height="300">
      <figcaption>${book.volumeInfo.authors}</figcaption>
      <p>${
        book.volumeInfo.description === undefined
          ? "There is no description"
          : book.volumeInfo.description.slice(0, 500)
      }...</p>
      <button id="addfavorites${book.id}">Add to Favorites</button>
      `;
  } else {
    bookElem.setAttribute("id", book.id);
    bookElem.innerHTML = `
        <h1 id="idk">${book.volumeInfo.title}</h1>
        <img class="image" src="${
          book.volumeInfo.imageLinks.thumbnail
        }" width="autp" height="300">
        <figcaption>${book.volumeInfo.authors}</figcaption>
        <p>${
          book.volumeInfo.description === undefined
            ? "There is not description"
            : book.volumeInfo.description.slice(0, 500)
        }...</p>
        <button id="removefavorites${book.id}">Remove from Favorites</button>
        `;
  }
  if (number === 0) {
    bookElem
      .querySelector(`#addfavorites${book.id}`)!
      .addEventListener("click", (event) => addToFavorites(event, book));
  }else if (number ===2){
    bookElem
      .querySelector(`#removefavorites${book.id}`)!
      .addEventListener("click", (event) => removeFromFavorites2(event, book));
  } else if (number===1) {
    bookElem
      .querySelector(`#removefavorites${book.id}`)!
      .addEventListener("click", (event) => removeFromFavorites(event, book));
  }
  return bookElem;
};

async function init(book = "levski") {
  try {
    const resultsElem: HTMLElement | null = document.getElementById("results");
    const booksResp = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        book
      )}`
    );
    const books = await booksResp.json();
    console.log(books);
    resultsElem!.innerHTML = "";
    books.items.forEach(async (book) => {
      var num = await random(book)
      resultsElem!.appendChild(getBookElement(book, num));
    });
  } catch (err) {
    console.log("Error", err);
  }
}

async function random(book){
  const books = getAllBooks()
  for (var x of await books){
    if (x.id === book.id){
      return 2
    }
  }
  return 0
}

function myFunction(event) {
  event.preventDefault();
let book = (document.getElementById("bar") as HTMLFormElement).value as string;
  if (book.length === 0 ){
    book = "levski"
  }
  init(book);
}

async function addToFavorites(event, book) {
  event.preventDefault();
  console.log(333)
  document.getElementById(book.id)!.innerHTML = `
  <h1 id="idk">${book.volumeInfo.title}</h1>
        <img class="image" src="${
          book.volumeInfo.imageLinks.thumbnail
        }" width="autp" height="300">
        <figcaption>${book.volumeInfo.authors}</figcaption>
        <p>${
          book.volumeInfo.description === undefined
            ? "There is not description"
            : book.volumeInfo.description.slice(0, 500)
        }...</p>
        <button id="removefavorites${book.id}">Remove from Favorites</button>
  `;
  document
    .getElementById(`removefavorites${book.id}`)!
    .addEventListener("click", (event) => removeFromFavorites2(event, book));
  try {
    const postsResp = await fetch(API_BASE_URL, {
      method: `POST`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (postsResp.status >= 400) {
      return Promise.reject(postsResp.body);
    }
    return postsResp.json();
  } catch (err) {
    return Promise.reject(err);
  }
}

async function removeFromFavorites2(event, book) {
  event.preventDefault();
  console.log(0)
  document.getElementById(book.id)!.innerHTML = `
<h1 id="idk">${book.volumeInfo.title}</h1>
      <img class="image" src="${
        book.volumeInfo.imageLinks.thumbnail
      }" width="autp" height="300">
      <figcaption>${book.volumeInfo.authors}</figcaption>
      <p>${
        book.volumeInfo.description === undefined
          ? "There is not description"
          : book.volumeInfo.description.slice(0, 500)
      }...</p>
      <button id="addfavorites${book.id}">Add to Favorites</button>
`;
  document
    .getElementById(`addfavorites${book.id}`)!
    .addEventListener("click", (event) => addToFavorites(event, book));
  await fetch("http://localhost:4000/api/books/" + book.id, {
    method: "DELETE",
  });
}

async function removeFromFavorites(event, book) {
  event.preventDefault();
  await fetch("http://localhost:4000/api/books/" + book.id, {
    method: "DELETE",
  });
  document.getElementById(book.id)!.remove();
}

async function getAllBooks() {
  try {
    const postsResp = await fetch(API_BASE_URL);
    if (postsResp.status >= 400) {
      return Promise.reject(postsResp.body);
    }
    return postsResp.json();
  } catch (err) {
    return Promise.reject(err);
  }
}

async function myFavorites(event) {
  try {
    const resultsElem = document.getElementById("results");
    const books = await getAllBooks();
    console.log(books);
    resultsElem!.innerHTML = "";
    books.forEach((book) => {
      resultsElem!.appendChild(getBookElement(book, 1));
    });
  } catch (err) {
    console.log("Error", err);
  }
}

init("apple");
