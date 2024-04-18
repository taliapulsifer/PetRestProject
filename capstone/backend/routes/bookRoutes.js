const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

//Create a route to handle a new book
router.post('/books', async (req, res) => {
    try
    {
        const {title, author, publisher, isbn } = req.body;

        //Extract book data
        const newBook = new Book({
            title,
            author,
            publisher,
            isbn
        });

        await newBook.save();

        res.status(201).json({message: 'Book added successfully', book: newBook});

    }catch (error)
    {
        console.error('Error adding book: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.delete('/books/id', async (req, res) => {
    try
    {
        const bookID = req.params.id;

        await Book.findByIDAndDelete(bookID);

        res.json({message: 'Book deleted successfully'})
    }
    catch (error)
    {
        console.error('Error deleting book: ', error);
        res.status(500).json({error: 'Internal server error'});

    }
});

module.exports = router;