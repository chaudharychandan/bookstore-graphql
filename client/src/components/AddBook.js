import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      authorId: ""
    }
  }

  displayAuthors() {
    let { loading, authors } = this.props.getAuthorsQuery;
    if (loading) {
      return (
        <option disabled>Loading authors...</option>
      );
    } else {
      return authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        );
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { title, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        title,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });

    this.setState({
      title: '',
      genre: '',
      authorId: ""
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.onSubmit}>
        <div className="field">
          <label>Book title:</label>
          <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} required />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" value={this.state.genre} onChange={(event) => this.setState({ genre: event.target.value })} required />
        </div>
        <div className="field">
          <label>Author:</label>
          <select value={this.state.authorId} onChange={(event) => this.setState({ authorId: event.target.value })} required >
            <option value="">Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>Add</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
