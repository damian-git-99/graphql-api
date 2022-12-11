const { rule, shield, not } = require('graphql-shield');

const isAuthenticated = rule()((parent, args, { authenticatedUser }) => {
  return authenticatedUser !== false;
});

const permissions = shield(
  {
    Query: {
      users: isAuthenticated,
      user: isAuthenticated,
      tasks: isAuthenticated
    },
    Mutation: {
      deleteUser: isAuthenticated
    },
    User: {
      tasks: isAuthenticated
    }
  },
  { allowExternalErrors: true }
);

module.exports = { permissions };
