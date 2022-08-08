//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

//add Book to list
UI.prototype.addBooktoList = function (book) {
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
};

//Show alert
UI.prototype.showAlert = function (message, className) {
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
};

//Delete Book
UI.prototype.deleteBook = (target) => {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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

  //show Message
  ui.showAlert("Book Deleted!", "success");
});
