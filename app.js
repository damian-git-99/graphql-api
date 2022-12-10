const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/dbConfig');
const { startApolloServer } = require('./src/graphql/Server');
require('colors')
require('dotenv').config()

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// init db config
connectDB();

// init apollo server
startApolloServer(app);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`.bgGreen.bold);
});