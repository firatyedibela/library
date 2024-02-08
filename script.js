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
  myLibrary.forEach((book) => {
    // For each book, create the cells and fill the cells with data
    /*
      Make cell's ids are the same as the book object's properties, that way the cell will get
      the right value for itself > cell.textContext = book[cell.id];
    */
    document.querySelector('#table-body').innerHTML += `
      <tr>
        <td id="name"></td>
        <td id="author"></td>
        <td id="pages"></td>
        <td id="status"></td>
        <td id="remove"></td>
      </tr>
    `;
    // Iterate through all the cells that's just created and give them the current book object's data
    const cells = Array.from(document.querySelectorAll('#table-body > tr:last-child > td'));
    cells.forEach((cell) => {
      cell.textContent = book[cell.id];
    });
    
    // Add remove image
    cells[cells.length - 1].innerHTML = `<img class="trash-bin-svg" src="./svg/reshot-icon-garbage-F6JTU7P2X4.svg" alt="">`;

    // Update status cell's content to display Read or Not Read instead of true/false
    cells[cells.length - 2].textContent = book.status ? 'Read' : 'Not Read';
  });
}

function emptyForm() {
  document.querySelector('#book-form').reset();
  document.querySelector('#book-form #name').focus();
}