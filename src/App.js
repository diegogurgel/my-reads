import React, { Component } from 'react';
import './App.css';
import Shelf from "./Shelf";
import {getAll as getBooks} from './BooksAPI';

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
      <div className="App">
        <Shelf title="Currently Reading" onBookChanged={this.onBookChanged} books={currentlyReading}/>
        <Shelf title="Want to Read" onBookChanged={this.onBookChanged} books={wantToRead} />
        <Shelf title="Read" onBookChanged={this.onBookChanged} books={read} />
      </div>
    );
  }
}

export default App;
