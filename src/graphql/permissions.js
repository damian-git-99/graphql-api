const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { authenticatedUser }) => {
  console.log(authenticatedUser)
  return authenticatedUser !== false;
});

const permissions = shield({
  Query: {
    users: isAuthenticated
  }
});

module.exports = { permissions };