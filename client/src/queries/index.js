import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      title
      genre
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($title: String!, $genre:  String!, $authorId: ID!) {
    addBook (title: $title, genre: $genre, authorId: $authorId) {
      title
      id
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };
