import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI.js";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Bookshelf from "./Bookshelf.js";
import Search from "./Search.js";

class BooksApp extends React.Component {
  state = {
    books: []
  };
  /**
   * @description Fetch all the books using the getAll method from the BooksAPI
   */
  fetchAll = () => {
    BooksAPI.getAll().then(books => this.setState({ books }));
  };
  /**
   * @description Fetch all the books using the getAll method from the BooksAPI after the component is mounted
   */
  componentDidMount = () => {
    this.fetchAll();
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf
                    title="Currently reading"
                    shelf="currentlyReading"
                    books={this.state.books}
                    refetch={this.fetchAll.bind(this)}
                  />
                  <Bookshelf
                    title="Want to read"
                    shelf="wantToRead"
                    books={this.state.books}
                    refetch={this.fetchAll.bind(this)}
                  />
                  <Bookshelf
                    title="Read"
                    shelf="read"
                    books={this.state.books}
                    refetch={this.fetchAll.bind(this)}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => <Search booksOnShelves={this.state.books} refetch={this.fetchAll}/>}
        />
      </div>
    );
  }
}

export default BooksApp;