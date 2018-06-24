const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID
} = graphql;

const books = [
  { title: 'A', genre: 'A', id: '1' },
  { title: 'B', genre: 'B', id: '2' },
  { title: 'C', genre: 'C', id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString }
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
