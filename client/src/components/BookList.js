import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';
import { BookDetails } from './';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    let { loading, books } = this.props.data;
    if (loading) {
      return <div>Loading</div>;
    } else {
      return books.map(book => {
        return (
          <li key={book.id} onClick={(event) => this.setState({ selected: book.id })}>{book.title}</li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
