import React from "react";
import * as BooksAPI from "./BooksAPI.js";
import PropTypes from "prop-types";

class Book extends React.Component {
  /**
   * @description This function updates the shelf where the book is located
   * @param {Object} book - The Object that represent a book
   * @param {String} shelf  - The name of the shelf
   * @param {function} refetch - The function drilled from App.js that fetch all the books
   */
  handleChange = (book, shelf, refetch) => {
    BooksAPI.update(book, shelf).then(res => {
      refetch();
    });
  };

  render() {
    const { book, refetch } = this.props;
    const width = 128;
    const height = 193;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: width,
              height: height,
              backgroundImage:
                book.imageLinks && book.imageLinks.thumbnail
                  ? `url(${book.imageLinks.thumbnail})`
                  : undefined //The thumbnail is set undefined if the cover image doesn`t exist
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={
                book.shelf && book.shelf.length > 0
                  ? book.shelf
                  : (book.shelf = "none")
              }
              onChange={event =>
                this.handleChange(book, event.target.value, refetch)
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

Book.PropTypes = {
  book: PropTypes.object.isRequired,
  refetch: PropTypes.func
};

export default Book;