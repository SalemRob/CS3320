import React from 'react';
import AvailableBooks from './webFunctions/AvailableBooks';
import CheckedOutBooks from './webFunctions/CheckedOut';
import AddBookForm from './webFunctions/AddBook';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Library Book Tracker</h1>
      </header>
      <main>
        <AddBookForm />
        <h2>Available Books</h2>
        <AvailableBooks />
        <h2>Checked Out Books</h2>
        <CheckedOutBooks />
      </main>
    </div>
  );
}

export default App;
