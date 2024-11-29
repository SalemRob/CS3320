import React, { useEffect, useState } from 'react';
import { getAvailableBooks, checkOutBook } from '../api';

function AvailableBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await getAvailableBooks();
        setBooks(data);
      } catch (err) {
        console.error('Error finding available books:', err);
        setError('Failed find available books.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleCheckOut = async (bookId) => {
  const checkedOutBy = prompt('Name:');
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);


  if (!checkedOutBy || !dueDate) {
    alert('Please answer all questions.');
    return;
  }

  try {
    const updatedBook = await checkOutBook(bookId, { checkedOutBy, dueDate });
    const DueDate = new Date(updatedBook.data.dueDate).toLocaleDateString();
    alert(`Book checked out by ${updatedBook.data.checkedOutBy} until ${DueDate} (2 weeks).`);
    setBooks(books.filter((book) => book._id !== bookId));
  } catch (err) {
    console.error('Error checking out the book:', err.response || err);
    alert('Failed to check out the book. Please try again.');
  }
};


  return (
    <div>
      {loading && <p>Loading available books...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && books.length === 0 && <p>No books available for checkout.</p>}
      {!loading && !error && books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author}
              <button onClick={() => handleCheckOut(book._id)} style={{ marginLeft: '10px' }}>
                Check Out
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AvailableBooks;
