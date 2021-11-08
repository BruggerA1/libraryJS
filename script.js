const bookLibrary = []; 
const bookContainer = document.getElementById('bookContainer');

// modal
const modalForm = document.getElementById('formModal')
const modalClose = document.getElementById('formClose');
const formTitle = document.getElementById('formTitle');
const formAuthor = document.getElementById('formAuthor');
const formPages = document.getElementById('formPages');
const formReadBox = document.getElementById('formReadBox');
modalClose.addEventListener('click', () => modalForm.classList.add('modalToggle'))

// Add Button
const addButton = document.getElementById('addBookButton');
addButton.addEventListener('click', () => modalForm.classList.remove('modalToggle'));

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

function createBookObject(book) {
	const bookCard = document.createElement('div');
	bookCard.id = "bookCard";

	const itemInfo = document.createElement('span');
	itemInfo.id = 'bookInfo';
	itemInfo.innerText = book.info();
	itemInfo.classList.add('bookInfo')
	itemInfo.addEventListener('click', () => editBook(book))

	const bookStatus = document.createElement('span');
	bookStatus.innerText = (book.read == true) ? 'READ': 'UNREAD';
	bookStatus.classList.add('bookStatus');

	const bookDeleteButton = document.createElement('input');
	bookDeleteButton.type = "button";
	bookDeleteButton.value = 'clear';
	bookDeleteButton.classList.add('material-icons');
	bookDeleteButton.classList.add('button');
	bookDeleteButton.id = "deleteBook";
	bookDeleteButton.addEventListener('click', () => deleteBookFromLibrary(book));

	const bookReadToggle = document.createElement('input');
	bookReadToggle.type = "button";
	bookReadToggle.value = (book.read == true) ? "check_box" : "check_box_outline_blank";
	bookReadToggle.classList.add('material-icons');
	bookReadToggle.classList.add('button');
	bookReadToggle.id = "toggleBook";
	bookReadToggle.addEventListener('click', () => toggleReadBook(book));

	const bookStatusContainer = document.createElement('div');
	bookStatusContainer.classList.add('flex');
	bookStatusContainer.classList.add('bookStatusContainer');

	bookStatusContainer.appendChild(bookReadToggle);
	bookStatusContainer.appendChild(bookStatus);
	bookCard.appendChild(bookStatusContainer)
	bookCard.appendChild(itemInfo);
	bookCard.appendChild(bookDeleteButton);
	bookContainer.prepend(bookCard);
};

function refreshBookList() {
	bookContainer.innerText = null;
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

function toggleReadBook(book) {
	book.read = !book.read;
	refreshBookList();
}

function editBook(book) {
	console.log(book);
	modalForm.classList.remove('modalToggle');

}






//init();
addBookToLibrary(new Book('Short Book', 'Author', 294, true));
addBookToLibrary(new Book('The Very Very Long Book Title of a Very Boring Book', 'Author with Many Names', 294, false));



refreshBookList();

document.getElementById('formSubmitButton').addEventListener('click', () => submitForm())


function submitForm() {
	const bookForm = document.forms['addBookForm'];
	const newBook = new Book(bookForm[1].value, bookForm[2].value, bookForm[3].value, bookForm[4].checked)
	addBookToLibrary(newBook);
	modalForm.classList.toggle('modalToggle');
}

