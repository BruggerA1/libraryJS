const bookLibrary = []; 
const libraryContainer = document.querySelector('main');

// modal
const modalWindows = document.getElementById('modal')
const modalClose = document.getElementById('modal-close');
modalClose.addEventListener('click', () => modalWindows.classList.add('modal-toggle'))

// Add Button
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => modalWindows.classList.remove('modal-toggle'));

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	info() {
		let isRead = (this.read == true) ? 'Already Read' : 'Not Yet Read';

		return `${this.title}, by ${this.author} (${this.pages} pages). ${isRead}.`;
	}
};

function createBookObject(book) {
	const bookCard = document.createElement('div');
	bookCard.classList.add('book-card')
	const bookInfo = document.createElement('span');
	bookInfo.innerText = `${book.title} \n ${book.author}`;
	bookInfo.classList.add('book-info');
	bookCard.addEventListener('click', () => console.log(book.info()));

	const bookButton = document.createElement('span');
	bookButton.innerText = 'clear';
	bookButton.classList.add('material-icons')
	bookButton.classList.add('delete-book');
	bookButton.addEventListener('click', () => deleteBookFromLibrary(book));

	bookCard.appendChild(bookInfo);
	bookCard.appendChild(bookButton);
	libraryContainer.prepend(bookCard);

}

function refreshBookList() {
	libraryContainer.innerText = null;
	bookLibrary.forEach(book => createBookObject(book));;
};

function addBookToLibrary(book){
	bookLibrary.push(book);
	refreshBookList();
};

function deleteBookFromLibrary(book) {
	bookLibrary.splice(bookLibrary.indexOf(book),1);
	refreshBookList();
};

//init();
addBookToLibrary(new Book('The Hobbit', 'JRR Tolkien', 294, false));

refreshBookList();


document.getElementById('modal-submit').addEventListener('click', () => submitForm())

function submitForm() {
	const bookForm = document.forms['addBookForm'];
	const newBook = new Book(bookForm[0].value, bookForm[1].value, bookForm[2].value, bookForm[3].checked)
	addBookToLibrary(newBook);
	modalWindows.classList.toggle('modal-toggle');
}