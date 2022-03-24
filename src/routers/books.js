const express = require('express');
const router = express.Router();
const data = require('../../data');

router.get('/', (req, res) => {
	res.json({ books: data.books });
});

router.get('/:id', (req, res) => {
	const existingBook = data.books.find(
		(book) => book.id === parseInt(req.params.id)
	);
	if (!existingBook) {
		res.status(404);
		res.json({ error: 'book not found' });
	}
	res.json({
		book: data.books.find((book) => book.id === parseInt(req.params.id)),
	});
});

router.delete('/:id', (req, res) => {
	const bookToDelete = data.books.find(
		(book) => book.id === parseInt(req.params.id)
	);
	if (!bookToDelete) {
		res.status(404);
		res.json({ error: 'book not found' });
		return;
	}
	data.books = data.books.filter((book) => book.id !== bookToDelete.id);
	res.json({ book: bookToDelete });
});

router.put('/:id', (req, res) => {
	const existingBook = data.books.find(
		(book) => book.id === parseInt(req.params.id)
	);
	if (!existingBook) {
		res.status(404);
		res.json({ error: 'book not found' });
		return;
	}
	if (!req.body.title) {
		res.status(400);
		res.json({ error: 'title not found' });
	}
	if (!req.body.type) {
		res.status(400);
		res.json({ error: 'type not found' });
	}
	if (!req.body.author) {
		res.status(400);
		res.json({ error: 'author not found' });
	}
	existingBook.title = req.body.title;
	existingBook.type = req.body.type;
	existingBook.author = req.body.author;
	res.json({ book: existingBook });
});

router.patch('/:id', (req, res) => {
	const existingBook = data.books.find(
		(book) => book.id === parseInt(req.params.id)
	);
	if (!existingBook) {
		res.status(404);
		res.json({ error: 'book not found' });
		return;
	}
	if (req.body.title) {
		existingBook.title = req.body.title;
	}
	if (req.body.type) {
		existingBook.type = req.body.type;
	}
	if (req.body.author) {
		existingBook.author = req.body.author;
	}
	res.json({ book: existingBook });
});

module.exports = router;
