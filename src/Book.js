import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { update as updateBook } from './BooksAPI';
import './Book.css'
import more from './icons/more.svg'
class Book extends Component {
    state = {
        loading:false
    }
    onMoveToShelf = (selectedStatus, book) => {
        this.setState({loading: true})
        book.shelf = selectedStatus.target.value
        updateBook(book, book.shelf)
            .then((something)=>{
                this.props.onBookChanged(book)
                this.setState({ loading: false })
            })
    }
    render(){
        const book = { ...this.props }
        return (
            <div className="book">
                {this.state.loading && 
                (<div className="loader"><div className="spinner"></div></div>)}
                <img src={book.imageLinks && book.imageLinks.thumbnail} alt="thumbnail" />
                <div className="book-info">
                    <h2>{book.title}</h2>
                    <p className="subtitle">{book.subtitle}</p>
                    <p className="ratting">Rating: {book.averageRating}</p>
                    <p className="author">Author(s): {book.authors && book.authors.join(', ')}</p>
                </div>
                {!this.state.loading && 
                (
                    <div className="book-menu">
                        <select value={book.shelf} onChange={(ev) => (this.onMoveToShelf(ev, book))}>
                            <option disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>   
                    </div>
                )}
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