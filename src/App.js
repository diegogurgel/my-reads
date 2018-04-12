import React, { Component } from 'react';
import Book from './Book'
import './App.css';
const book = {
  "title": "The Linux Command Line",
  "subtitle": "A Complete Introduction",
  "authors": [
    "William E. Shotts, Jr.",
  ],
  "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  "averageRating": 3.5
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Book {...book} />
      </div>
    );
  }
}

export default App;
