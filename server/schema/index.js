const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

const books = [
  { title: 'A', genre: 'A', id: '1', authorId: '1' },
  { title: 'B', genre: 'B', id: '2', authorId: '2' },
  { title: 'C', genre: 'C', id: '3', authorId: '3' },
  { title: 'D', genre: 'D', id: '4', authorId: '3' },
  { title: 'E', genre: 'E', id: '5', authorId: '1' },
  { title: 'F', genre: 'F', id: '6', authorId: '3' }
];

const authors = [
  { name: 'X', city: 'X', id: '1' },
  { name: 'X', city: 'Y', id: '2' },
  { name: 'X', city: 'Z', id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        const { authorId } = parent;
        return authors.find((author) => author.id === authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    city: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        const { id } = parent;
        return books.filter((book) => book.authorId === id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return books.find((book) => book.id === id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return authors.find((author) => author.id === id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
