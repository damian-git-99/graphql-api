const { rule, shield, not } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { authenticatedUser }) => {
  return authenticatedUser !== false;
});

const permissions = shield({
  Query: {
    users: isAuthenticated,
    user: isAuthenticated
  },
  Mutation: {
    deleteUser: isAuthenticated,
    signIn: not(isAuthenticated),
    logIn: not(isAuthenticated)
  }
});

module.exports = { permissions };