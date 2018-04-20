import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search as searchBook } from './BooksAPI';
import Shelf from "./Shelf";
import './Search.css'
class Search extends Component{
    state = {
        query: '',
        books: [] 
    }
    search = (query) => {
        this.setState({query})
        searchBook(query).then(books => {
            if (books && books.error){
                this.setState({ books: [] })
            } else{
                const mappedBooks = books.map(book => {
                    const sameBook = this.props.myReads.filter((knownBook) => knownBook.id === book.id)[0]
                    if(sameBook){
                        return sameBook
                    }
                    book.shelf = 'none'
                    return book
                })
                this.setState({ books: mappedBooks })
            }
        })
    }
    render(){
        return(
            <div>
                <header>
                    <Link to="/" className="back-link"></Link>
                    <input type="search" value={this.state.query} onChange={(ev) => {
                        this.search(ev.target.value)
                    }}/>
                    <Shelf title="Search result" onBookChanged={this.props.onBookChanged} books={this.state.books} />
                </header>


            </div>
        )
    }
}
export default Search