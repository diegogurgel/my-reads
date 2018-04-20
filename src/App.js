import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Search from './Search'
import Shelf from "./Shelf";
import { getAll as getBooks } from './BooksAPI';
import './App.css';


class App extends Component {
  state = {
    books: []
  }
  componentDidMount(){
    getBooks().then( books => {
      this.setState({ books })
    })
  }
  onBookChanged = (changedBook) => {
    let books = this.state.books.filter((book) => book.id !== changedBook.id)
    books.push(changedBook)
    this.setState({books})
  }
  render() {
    const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading')
    const read = this.state.books.filter(book => book.shelf === 'read')
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact render={() => (
            <div className="app">
              <Shelf title="Currently Reading" onBookChanged={this.onBookChanged} books={currentlyReading} />
              <Shelf title="Want to Read" onBookChanged={this.onBookChanged} books={wantToRead} />
              <Shelf title="Read" onBookChanged={this.onBookChanged} books={read} />
              <Link to="/add-book" className="add"></Link>
            </div>

          )} />
          <Route path="/add-book" render={() => (
            <Search onBookChanged={this.onBookChanged} myReads={this.state.books}/>
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
