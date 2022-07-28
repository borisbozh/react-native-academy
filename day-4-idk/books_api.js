const getBookElement = function (book) {
    const bookElem = document.createElement("div");
    bookElem.innerHTML =
      `
      <h1 id="idk">${book.volumeInfo.title}</h1>
      <img class="image" src="${book.volumeInfo.imageLinks.thumbnail}" width="400" height="auto">
      <figcaption>${book.volumeInfo.authors}</figcaption>
      <p>${book.volumeInfo.description.slice(0,1200)}...</p>
      `;
      return bookElem;
  };


async function init() {
try {
    const resultsElem = document.getElementById("results");
    const booksResp = await fetch("books.json");
    const books = await booksResp.json();
    console.log(books);
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
init();

