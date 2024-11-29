const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/available', async (req, res) => {
  try {
    const books = await Book.find({ status: 'available' });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching available books' });
  }
});


router.get('/checked-out', async (req, res) => {
  try {
    const books = await Book.find({ status: 'checked out' });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching checked-out books' });
  }
});


router.put('/checkout/:id', async (req, res) => {
  const { checkedOutBy, dueDate } = req.body;

  console.log('Request Body:', req.body); 
  console.log('Request Params (ID):', req.params.id); 

  try {
    const book = await Book.findByIdAndUpdate(req.params.id,{ status: 'checked out', checkedOutBy, dueDate },{ new: true });

    if (!book) {
      console.log('Book not found for ID:', req.params.id);
      return res.status(404).json({ error: 'Book not found' });
    }

    console.log('Book updated successfully:', book); 
    res.json(book);

  } catch (err) {
    console.error('Error during book checkout:', err); 
    res.status(500).json({ error: 'Error checking out the book' });
  }
});


router.put('/checkin/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, {status: 'available',checkedOutBy: null,dueDate: null,}, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error checking in the book' });
  }
});

// Add a new book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error adding the book' });
  }
});

// Update book information
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error updating the book' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the book' });
  }
});

module.exports = router;
