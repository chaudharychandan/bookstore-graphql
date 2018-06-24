const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID
} = graphql;

const books = [
  { title: 'A', genre: 'A', id: '1', authorId: '1' },
  { title: 'B', genre: 'B', id: '2', authorId: '2' },
  { title: 'C', genre: 'C', id: '3', authorId: '3' }
];

const authors = [
  { name: 'D', city: 'X', id: '1' },
  { name: 'E', city: 'Y', id: '2' },
  { name: 'F', city: 'Z', id: '3' }
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
    city: { type: GraphQLString }
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
