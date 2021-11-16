class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	info() {
		return `${this.title} \n ${this.author}`;
	}
};

const library = {
	db: [],
	container: document.getElementById('bookContainer'),
	addBookButton: document.getElementById('addBookButton'),
};

const form = {
	data: document.forms['formData'],
	modal: document.getElementById('formModal'),
	closeButton: document.getElementById('formCloseButton'),
	submitButton: document.getElementById('formSubmitButton'),
	title: document.getElementById('formTitle'),
	author: document.getElementById('formAuthor'),
	pages: document.getElementById('formPages'),
	readBox: document.getElementById('formReadBox'),
	editMode: false,
	editIndex: null,
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

function refreshBookList() {
	// Clear Library
	library.container.innerText = null;
	// Add Up-To-Date Book Cards
	library.db.forEach(book => createBookCard(book));;
};

function addBookToLibrary(book) {
	// Add Book to Database Array
	library.db.push(book);
	refreshBookList();
};

function deleteBookFromLibrary(book) {
	// Remove Book from Database Array
	library.db.splice(library.db.indexOf(book), 1);
	refreshBookList();
};

function editBookInLibrary() {
	library.db[form.editIndex] = new Book(
		form.data[1].value,
		form.data[2].value,
		form.data[3].value,
		form.data[4].checked
	);
	refreshBookList();
}

function toggleReadBook(book) {
	book.read = !book.read;
	refreshBookList();
}

function editBook(book) {
	form.modal.classList.toggle('modalToggle');

	form.editMode = true;
	form.editIndex = library.db.indexOf(book);

	form.title.value = book.title;
	form.author.value = book.author;
	form.pages.value = book.pages;
	form.readBox.checked = book.read;
}

function submitForm() {
	(form.editMode == true) ? editBookInLibrary() : addBookToLibrary(new Book(
		form.data['formTitle'].value,
		form.data['formAuthor'].value,
		form.data['formPages'].value,
		form.data['formReadBox'].checked
	));

	form.editMode = false;
	form.editIndex = null;

	form.data['formTitle'].value = '';
	form.data['formAuthor'].value = '';
	form.data['formPages'].value = '';
	form.data['formReadBox'].checked = false;

	form.modal.classList.toggle('modalToggle');
}

function init() {
	library.addBookButton.addEventListener('click', () => form.modal.classList.toggle('modalToggle'));
	form.closeButton.addEventListener('click', () => form.modal.classList.toggle('modalToggle'));
	form.submitButton.addEventListener('click', () => submitForm());

	addBookToLibrary(new Book('The Incredibly Long Book Title of a Very Old and Boring Book', 'Author with Many Pretentious Names III', 294, false));
	addBookToLibrary(new Book('Short Title', 'Anonymous', 100, true));
};

init();