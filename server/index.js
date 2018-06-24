const express =  require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema');

const app = express();

app.use(cors());

mongoose.connect('mongodb://chandan:bookstore1@ds263640.mlab.com:63640/bookstore-graphql');
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen('4000', () => {
  console.log('Listening for requests on port 4000');
});
