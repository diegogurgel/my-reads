import React from 'react'
import PropTypes from 'prop-types'
import './Book.css'
import more from './icons/more.svg'
const Book = (props) => {

    return (
        <div className="book">
            <img src={props.thumbnail} alt="thumbnail"/>
            <div className="book-info">
                <h2>{props.title}</h2>
                <p className="subtitle">{props.subtitle}</p>
                <p className="ratting">Rating: {props.averageRating}</p>
                <p className="author">Author(s): {props.authors.join(', ')}</p>
            </div>
            <div className="menu-icon">
                <img src={more} alt=""/>
            </div>
            <div className="book-menu">
                <small>Move to...</small>
                <button>Currently Reading</button>
                <button>Want to Read</button>
                <button>Read</button>
                <button>None</button>
            </div>
        </div>
    )
}
Book.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    averageRating: PropTypes.number,
    thumbnail: PropTypes.string.isRequired
}
export default Book