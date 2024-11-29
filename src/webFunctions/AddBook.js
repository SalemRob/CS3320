import React, { useState } from 'react';
import { addBook } from '../api';

function AddBookForm() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(form);
      alert('Book added successfully!');
      setForm({ title: '', author: '', publisher: '', isbn: '' });
    } catch (err) {
      console.error('Error adding book:', err);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Book</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="publisher"
        placeholder="Publisher"
        value={form.publisher}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={form.isbn}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
