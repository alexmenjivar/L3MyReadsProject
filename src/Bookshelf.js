import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
  
	render(){
      const {title, books, shelf, refetch} = this.props;
    	return(
        	<div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
          				{
          					books.filter(book => book.shelf === shelf).map((item) =>
                            <li key={item.id}>
                                <Book book={item} refetch={refetch}/>
                            </li>)
          				}
                    </ol>
                  </div>
                </div>
        )
    }
}

export default Bookshelf