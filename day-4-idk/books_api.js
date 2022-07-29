const getBookElement = function (book) {
    const bookElem = document.createElement("div");
    bookElem.innerHTML =
      `
      <h1 id="idk">${book.volumeInfo.title}</h1>
      <img class="image" src="${book.volumeInfo.imageLinks.thumbnail}" width="autp" height="300">
      <figcaption>${book.volumeInfo.authors}</figcaption>
      <p>${book.volumeInfo.description === undefined ? "There is not description" : book.volumeInfo.description.slice(0,500)}...</p>
      `;
      return bookElem;
  };


async function init(book) {
try {
    const resultsElem = document.getElementById("results");
    // const booksResp = await fetch("books.json");
    // const books = await booksResp.json();
    const booksResp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book)}`);
    const books = await booksResp.json();
    console.log(books);
    resultsElem.innerHTML = ""
    books.items.forEach(book => {
    resultsElem.appendChild(
        getBookElement (book)
    )
    });
} catch (err) {
    console.log("Error", err);
} finally {
    console.log("Demo finished");
}
}

function myFunction(event) {
    event.preventDefault()
    const book = document.getElementById("bar").value;
    init(book)
  }

init("apple");