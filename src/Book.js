import React from 'react'
import * as BooksAPI from './BooksAPI.js'

class Book extends React.Component {

	handleChange(book, shelf, refetch) {
	BooksAPI.update(book, shelf).then(res=>{
      refetch();
    });
  }
  
render(){
      const {book, refetch} = this.props;
      const width = 128;
      const height = 193;
    	return(
        	<div className="book">
          		<div className="book-top">
                  <div className="book-cover" style={{ width: width, height: height, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(event) => this.handleChange(book, event.target.value, refetch)}>
                      <option value="move" disabled>Move to...</option>
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
        )
    }
}

export default Book