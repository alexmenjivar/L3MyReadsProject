import React from "react";
import Book from "./Book";
import PropTypes from 'prop-types';

class Bookshelf extends React.Component {

  render() {
    const { title, books, shelf, refetch } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter(book => book.shelf === shelf)
              .map(book => (
                <li key={book.id}>
                  <Book book={book} refetch={refetch} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

Bookshelf.PropTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired
};

export default Bookshelf;