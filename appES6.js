class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBooktoList(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");

    //insert columns
    row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href='#' class="delete">x<a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //constructer Element
    //create div
    const div = document.createElement("div");
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //Get Parent
    const container = document.querySelector(".container");
    //Get Form
    const form = document.querySelector("#book-form");
    //Insert Alert
    container.insertBefore(div, form);
    //Tmeout after 3sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();

      // Add Book to UI
      ui.addBooktoList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//Event Listener For add book
document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // instantiate Book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add Book to list
    ui.addBooktoList(book);

    //add to Local Store
    Store.addBook(book);

    //show Alert
    ui.showAlert("Book Added", "success");

    //clear fields
    ui.clearFields();
  }
});

// Event Listener For Delete
document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();
  //Instantiate Ui
  const ui = new UI();

  //Delete Book
  ui.deleteBook(e.target);

  //Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show Message
  ui.showAlert("Book Deleted!", "success");
});
