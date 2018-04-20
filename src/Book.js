import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { update as updateBook } from './BooksAPI';
import './Book.css'
import more from './icons/more.svg'
class Book extends Component {
    onMoveToShelf = (selectedStatus, book) => {
        book.shelf = selectedStatus.target.value
        updateBook(book, book.shelf)
            .then((something)=>{
                this.props.onBookChanged(book)
            })
    }
    render(){
        const book = { ...this.props }
        return (
            <div className="book">
                <img src={book.imageLinks && book.imageLinks.thumbnail} alt="thumbnail" />
                <div className="book-info">
                    <h2>{book.title}</h2>
                    <p className="subtitle">{book.subtitle}</p>
                    <p className="ratting">Rating: {book.averageRating}</p>
                    <p className="author">Author(s): {book.authors && book.authors.join(', ')}</p>
                </div>
                <div className="book-menu">
                    <select value={book.shelf} onChange={(ev) => (this.onMoveToShelf(ev, book))}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>   
                </div>
            </div>
        )
    }
}
Book.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    averageRating: PropTypes.number,
    imageLinks: PropTypes.objectOf(PropTypes.string)
}
export default Book