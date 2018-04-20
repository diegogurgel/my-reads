import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './Shelf.css'
class Shelf extends Component {

    render() {
        return (
            <div className="shelf">
                <h1>{this.props.title}</h1>
                <ul>
                    {this.props.books && this.props.books.map(book => (
                        <li key={book.id}>
                            <Book onBookChanged={this.props.onBookChanged} {...book} />
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}
Shelf.propTypes = {
    title: PropTypes.string,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default Shelf