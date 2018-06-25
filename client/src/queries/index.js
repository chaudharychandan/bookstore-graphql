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

export { getBooksQuery, getAuthorsQuery };
