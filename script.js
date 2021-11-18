class Book {
	constructor(title, author, pages, read, bookID = 0) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.bookID = bookID;
	}
	info() { 
		return `${this.title} \n ${this.author}`; 
	}
};

const library = {
	addBookButton: document.getElementById('addBookButton'),
	container: document.getElementById('bookContainer'),

	db: [],
	dbLastIndex: () => library.db.length - 1 ,

	storage: window.localStorage,
};

const form = {
	editMode: false,
	data: document.forms['formData'],

	modal: document.getElementById('formModal'),
	closeButton: document.getElementById('formCloseButton'),
	submitButton: document.getElementById('formSubmitButton'),

	title: document.getElementById('formTitle'),
	author: document.getElementById('formAuthor'),
	pages: document.getElementById('formPages'),
	bookID: null,
	readBox: document.getElementById('formReadBox'),
};

function refreshBookList() {
	// Clear Library
	library.container.innerText =
		form.editMode =
		form.title.value =
		form.author.value =
		form.pages.value =
		form.bookID =
		form.readBox.checked = null;

	// Add Up-To-Date Book Cards
	library.db.forEach(book => createBookCard(book));;

};

function toggleModal() {
	form.modal.classList.toggle('modalToggle');
	refreshBookList();
};

function toggleReadBook(book) {
	book.read = !book.read;
	refreshBookList();
};

function editBook(book) {
	toggleModal();
	form.editMode = true;

	form.title.value = book.title;
	form.author.value = book.author;
	form.pages.value = book.pages;
	form.readBox.checked = book.read;
	form.bookID = book.bookID;
};

function deleteBookFromLibrary(book) {
	// Remove Book from Database Array
	library.db.splice(library.db.indexOf(book), 1);

	Object.values(localStorage).forEach(value => {
		let bookData = JSON.parse(value);
		if (bookData.bookID == book.bookID) localStorage.removeItem(bookData.bookID);
	})

	refreshBookList();
};

function editBookInLibrary() {
	library.db[form.bookID] = new Book(
		form.title.value,
		form.author.value,
		form.pages.value,
		form.readBox.checked,
		form.bookID,
	);
	saveToLocalStorage(library.db[form.bookID])
	refreshBookList();
};

function addBookToLibrary(book) {
	// Add Book to Database Array
	library.db.push(book);
	refreshBookList();
};

function submitForm() {
	let newBook = new Book(
		form.title.value,
		form.author.value,
		form.pages.value,
		form.readBox.checked,
		library.dbLastIndex() + 1,
	);
	if (form.editMode == true) {
		editBookInLibrary();
	} else {
		addBookToLibrary(newBook);
		saveToLocalStorage(newBook);
	};
	toggleModal();
};

function createBookCard(book) {
	const bookCard = {
		container: document.createElement('div'),
		statusContainer: document.createElement('div'),
		readToggle: document.createElement('input'),
		readStatus: document.createElement('span'),
		info: document.createElement('span'),
		deleteButton: document.createElement('input'),
	};

	// Container
	bookCard.container.classList.add("bookCard");

	// Status Container
	bookCard.statusContainer.classList.add('flex', 'bookStatusContainer');

	// Read Toggle
	bookCard.readToggle.classList.add('material-icons', 'button', 'toggleBook');
	bookCard.readToggle.type = "button";
	bookCard.readToggle.value = (book.read == true) ? "check_box" : "check_box_outline_blank";
	bookCard.readToggle.addEventListener('click', () => toggleReadBook(book));

	// Read Status
	bookCard.readStatus.classList.add('bookStatus');
	bookCard.readStatus.innerText = (book.read == true) ? 'READ' : 'UNREAD';

	// Info
	bookCard.info.classList.add('bookInfo')
	bookCard.info.innerText = book.info();
	bookCard.info.addEventListener('click', () => editBook(book))

	// Delete Button
	bookCard.deleteButton.classList.add('material-icons', 'button', 'deleteBook');
	bookCard.deleteButton.type = "button";
	bookCard.deleteButton.value = 'clear';
	bookCard.deleteButton.addEventListener('click', () => deleteBookFromLibrary(book));

	// Create DOM nodes
	bookCard.statusContainer.appendChild(bookCard.readToggle);
	bookCard.statusContainer.appendChild(bookCard.readStatus);

	bookCard.container.appendChild(bookCard.statusContainer)
	bookCard.container.appendChild(bookCard.info);
	bookCard.container.appendChild(bookCard.deleteButton);

	library.container.prepend(bookCard.container);
};

function saveToLocalStorage(book) {
	library.storage.setItem(`${book.bookID}`, JSON.stringify(book));
};

function loadLocalStoage() {
	let bookData = Object.values(localStorage).map(book => JSON.parse(book));

	bookData.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1);

	bookData.forEach(book => {
		let newBook = new Book(
			book.title, 
			book.author, 
			book.pages, 
			book.read, 
			book.bookID);
		addBookToLibrary(newBook);
	});
};

function init() {
	library.addBookButton.addEventListener('click', () => toggleModal());
	form.closeButton.addEventListener('click', () => toggleModal());
	form.submitButton.addEventListener('click', () => submitForm());
	loadLocalStoage();
};

init();
