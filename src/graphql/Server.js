const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { applyMiddleware } = require('graphql-middleware');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const pathFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(pathFile, { encoding: 'utf-8' });
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const { permissions } = require('./permissions');

const schema = applyMiddleware(
  makeExecutableSchema({
    resolvers,
    typeDefs
  }),
  permissions
);

const startApolloServer = async (app) => {
  try {
    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    app.use(
      '/graphql',
      cors(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          // todo move context code
          const token = req.headers.authorization;

          if (!token) {
            return {
              authenticatedUser: false
            };
          }

          try {
            // todo: move to jwtUtils
            const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            return {
              authenticatedUser: id
            };
          } catch (error) {
            return {
              authenticatedUser: false
            };
          }
        }
      })
    );
    console.log('Apollo server started correctly on path /graphql'.bgCyan);
  } catch (error) {
    console.log(
      'An error occurred while trying to start the apollo server'.bgRed
    );
    console.log(error);
  }
};

module.exports = {
  startApolloServer
};
