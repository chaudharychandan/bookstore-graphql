import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      title
      genre
      id
    }
  }
`;

class BookList extends Component {
  displayBooks() {
    let { loading, books } = this.props.data;
    if (loading) {
      return <div>Loading</div>;
    } else {
      return books.map(book => {
        return (
          <li key={book.id}>{book.title}</li>
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
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
