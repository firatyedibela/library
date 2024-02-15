const myLibrary = [{
  name: 'Dummy Book1',
  pages: 250,
  author: 'Dummy Author1',
  status: false,
}, {
  name: 'Dummy Book2',
  pages: 350,
  author: 'Dummy Author2',
  status: true,
}];

renderLibrary();

function Book(name, pages, author, status) {
  this.name = name;
  this.pages = pages;
  this.author = author;
  this.status = status;
}

  Book.prototype.toggleRead = function() {
    this.status = this.status ? false : true;
  }

document.querySelector('.add-book-btn').addEventListener('click', (e) => {
  // Prevent the button from submitting the form and reloading the page
  e.preventDefault()

  addBookToLibrary();
  renderLibrary();
  emptyForm();
});


function addBookToLibrary() {
  // Get book's properties
  const name = document.querySelector('#name').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const status = document.querySelector('#read').checked;

  // Push new object to myLibrary array
  const book = new Book(name, author, pages, status);
  myLibrary.push(book);
}

function renderLibrary() {
  // First empty the table, then recreate table html to avoid duplication
  document.querySelector('#table-body').innerHTML = '';
  
  // Iterate through myLibrary, generate html for each book, add html to #table-body, and then fill that html with data
  myLibrary.forEach((book, index) => {
    // For each book, create the cells and fill the cells with data
    /*
      Make cell's ids are the same as the book object's properties, that way the cell will get
      the right value for itself > cell.textContext = book[cell.id];
    */
    // Giving each row the index of the book they contain
    const row = `
      <tr>
        <td id="name"></td>
        <td id="author"></td>
        <td id="pages"></td>
        <td id="status"></td>
        <td id="remove"></td>
      </tr>
    `;

    document.querySelector('#table-body').innerHTML += row;
    // Iterate through all the cells that's just created and give them the current book object's data
    const cells = Array.from(document.querySelectorAll('#table-body > tr:last-child > td'));
    cells.forEach((cell) => {
      cell.textContent = book[cell.id];
    });
    
    // Add remove button, call removeBook() with current book index 
    cells[cells.length - 1].innerHTML = `<img 
      class="trash-bin-svg"
      src="./svg/reshot-icon-garbage-F6JTU7P2X4.svg"
      data-index="${index}"
    >`;

    // Update status cell's content to display checked or unchecked logos instead of true/false
    if (book.status) {
      cells[cells.length - 2].innerHTML = `<img 
        class="checked-svg status-button"
        src="./svg/check-bold.svg"
        data-index="${index}"
      >`;
    } else {
      cells[cells.length - 2].innerHTML = `<img 
        class="unchecked-svg status-button"
        src="./svg/close-thick.svg"
        data-index="${index}"
      >`;
    }
  });

  // Make trash buttons interactive
  const removeButtons = document.querySelectorAll('.trash-bin-svg');
  removeButtons.forEach((button) => {
    button.addEventListener('click', event => {
      const bookIndex = button.getAttribute('data-index');
      removeBook(bookIndex);
      renderLibrary();
    });
  });

  // Make status buttons interactive
  const statusButtons = document.querySelectorAll('.status-button');
  statusButtons.forEach((button) => {
    button.addEventListener('click', event => {
      const bookIndex = button.getAttribute('data-index');
      console.log(myLibrary[bookIndex]);
      myLibrary[bookIndex].toggleRead();
      renderLibrary();
    });
  });
}

function emptyForm() {
  document.querySelector('#book-form').reset();
  document.querySelector('#book-form #name').focus();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}