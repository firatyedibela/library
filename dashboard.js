import { myLibrary } from './script.js';

const booksRead = document.querySelector('#books-read');
const booksUnread = document.querySelector('#books-unread');
const totalBooks = document.querySelector('#total-books');
const totalAuthors = document.querySelector('#total-authors');
const totalPages = document.querySelector('#total-pages');

export function renderDashboard() {
  booksRead.textContent = getBooksRead();
  booksUnread.textContent = getBooksUnread();
  totalBooks.textContent = getTotalBooks();
  totalAuthors.textContent = getTotalAuthors();
  totalPages.textContent = getTotalPages();
}

function getTotalBooks() {
  return myLibrary.length;
}

function getBooksRead() {
  return myLibrary.filter(book => book.status).length;
}

function getBooksUnread() {
  return getTotalBooks() - getBooksRead();
}

function getTotalPages() {
  let pages = 0;
  myLibrary.forEach(book => {
    if (book.status) {
      pages += Number(book.pages);
    }
  });
  return pages;
}

function getTotalAuthors() {
  const authors = [];
  myLibrary.forEach(book => {
    authors.push(book.author.toLowerCase());
  });
  const uniqueAuthors = authors.filter((author, index) => {
    // Keep only the first occurrence of each author in the array
    return authors.indexOf(author) === index;
  });
  console.log(authors);
  console.log(uniqueAuthors);
  return uniqueAuthors.length;
}