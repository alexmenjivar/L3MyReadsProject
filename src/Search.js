import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI.js";

class Search extends React.Component {
  state = {
    query: "",
    books: []
  };

  /**
   * @description Converts the Input tag in a controlled component. Updates the value of the input.
   * @param {string} query - The string of the input tag.
   */
  updateQuery = query => {
    this.setState(
      () => ({
        query: query
      }),
      () => {
        BooksAPI.search(this.state.query).then(books => {
          books && books.length > 0
            ? this.setState({
                books: this.mergedProcess(books, this.props.booksOnShelves)
              })
            : console.log("empty array");
        });
      }
    );
  };

  mergedProcess = (booksFromSearch, booksOnShelves) => {
    let booksMerged = booksFromSearch.map(bookFromSearch => {
      return booksOnShelves.reduce((book, bookOnShelf) => {
        if (bookOnShelf.id === bookFromSearch.id) {
          return bookOnShelf;
        }
        return book;
      }, bookFromSearch);
    });
    return booksMerged;
  };

  render() {
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
            onClick={() => this.props.refetch()}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
