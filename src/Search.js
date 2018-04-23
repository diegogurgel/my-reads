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
    onBookChanged = (book) => { 
        this.props.onBookChanged(book)
        this.setState(state => (
            {
                books:state.books.map(foundBook => {
                    if(foundBook.id === book.id){
                        foundBook = book;
                    }
                    return foundBook
                })
            }
        ))
    }
    search = (query) => {
        this.setState({ query })
            searchBook(query).then(books => {
                if (books && books.error) {
                    books = [];
                }
                const mappedBooks = books.map(book => {
                    const sameBook = this.props.myReads.filter((knownBook) => knownBook.id === book.id)[0]
                    if (sameBook) {
                        return sameBook
                    }
                    book.shelf = 'none'
                    return book
                })
                this.setState({ books: mappedBooks })
            }).catch(err =>{
                this.setState({ books: [] })
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
                </header>
                <Shelf title="Search result" onBookChanged={this.onBookChanged} books={this.state.books} />   


            </div>
        )
    }
}
export default Search