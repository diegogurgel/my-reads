import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { update as updateBook } from './BooksAPI';
import './Book.css'
import more from './icons/more.svg'
class Book extends Component {
    onMoveToSelected = (selectedStatus, book) => {
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
                <img src={book.imageLinks.thumbnail} alt="thumbnail" />
                <div className="book-info">
                    <h2>{book.title}</h2>
                    <p className="subtitle">{book.subtitle}</p>
                    <p className="ratting">Rating: {book.averageRating}</p>
                    <p className="author">Author(s): {book.authors.join(', ')}</p>
                </div>
                <div className="book-menu">
                    <select value={book.shelf} onChange={(ev) => (this.onMoveToSelected(ev, book))}>
                        <option value="none" disabled>Move to...</option>
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
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    averageRating: PropTypes.number,
    imageLinks: PropTypes.objectOf(PropTypes.string).isRequired
}
export default Book