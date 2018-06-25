import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      authorId: ''
    }
  }

  displayAuthors() {
    let { loading, authors } = this.props.data;
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
    console.log(this.state);
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.onSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(event) => this.setState({ title: event.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(event) => this.setState({ genre: event.target.value })} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(event) => this.setState({ authorId: event.target.value })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
