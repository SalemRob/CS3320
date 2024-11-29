import React, { useEffect, useState } from 'react';
import { getCheckedOutBooks, checkInBook } from '../api';

function CheckedOutBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await getCheckedOutBooks();
        setBooks(data);
      } catch (err) {
        console.error('Error finding checked out books:', err);
        setError('No books are currently checked out.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleCheckIn = async (bookId) => {
    try {
      const updatedBook = await checkInBook(bookId);
      alert(`Book "${updatedBook.data.title}" has been checked in.`);
      // Removes the book from the checked out list
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Error checking in the book:', err);
      alert('Failed to check in the book. Please try again.');
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'black' }}>{error}</p>}
      {!loading && !error && books.length === 0 && <p>No books are currently checked out.</p>}
      {!loading && !error && books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author} <br />
              <em>Checked out by: {book.checkedOutBy}</em> <br />
              <em>Due Date: {new Date(book.dueDate).toLocaleDateString()}</em>
              <button onClick={() => handleCheckIn(book._id)} style={{ marginLeft: '10px' }}>
                Check In
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CheckedOutBooks;
