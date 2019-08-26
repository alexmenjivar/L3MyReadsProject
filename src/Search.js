import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI.js'

class Search extends React.Component {
  
  state = {
        query: '',
    	books: []
  }

    updateQuery = query => {
      this.setState(() => ({
      	query: query.trim()
      }), () => {
      	BooksAPI.search(this.state.query).then(books => {
          //console.log(books)
          this.setState({books})
        })
      });
    };

	render() {
      console.log(this.state)
		const {books} = this.state
		return (
        	<div className="search-books">
            	<div className="search-books-bar">
        			<Link className="close-search" to="/">Close</Link>
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
					{
                    	books.length !== 0 ? books.map((book) =>
                            <li key={book.id}>
                                <Book book={book}/>
                            </li>) : console.log('empty array')
                    }
					</ol>
				</div>
        	</div>
    	); 
    }
}

export default Search