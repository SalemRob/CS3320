const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose
  .connect('mongodb://127.0.0.1:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const seedBooks = async () => {
  await Book.deleteMany();
  const books = [
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      publisher: 'Scholastic',
      isbn: '9780439708180',
    },
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      publisher: 'Scholastic',
      isbn: '9780439064873',
    },
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J.K. Rowling',
      publisher: 'Scholastic',
      isbn: '9780439136365',
    },
    {
      title: 'Harry Potter and the Goblet of Fire',
      author: 'J.K. Rowling',
      publisher: 'Scholastic',
      isbn: '9780439139601',
    },
    {
      title: 'Harry Potter and the Order of the Phoenix',
      author: 'J.K. Rowling',
      publisher: 'Scholastic',
      isbn: '9780439358071',
    },
    {
      title: 'Harry Potter and the Half-Blood Prince',
      author: 'J.K. Rowling',
      publisher: 'Scholastic',
      isbn: '9780439785969',
    },
    {
      title: 'Harry Potter and the Deathly Hallows',
      author: 'J.K. Rowling',
      publisher: 'Scholastic',
      isbn: '9780545010221',
    },
    {
      title: 'Dragon Rider',
      author: 'Cornelia Funke',
      publisher: 'Dressler',
      isbn: '9780439456954',
    },
    {
      title: 'Eragon',
      author: 'Christopher Paolini',
      publisher: 'Christopher Paolini',
      isbn: '9780375826696',
    },
    {
      title: 'The Guardians of Gahoole: The Rise of a Legend',
      author: 'Kathryn Lasky',
      publisher: 'Scholastic',
      isbn: '9780439405617',
    }
  ];
  await Book.insertMany(books);
  console.log('Seed data added!');
  mongoose.connection.close();
};

seedBooks();
