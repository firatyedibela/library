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

function Book(name, pages, author, status) {
  this.name = name;
  this.pages = pages;
  this.author = author;
  this.status = status;
}

document.querySelector('.add-book-btn').addEventListener('click', (e) => {
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
  console.table(myLibrary);
}