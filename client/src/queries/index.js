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

export { getBooksQuery };
