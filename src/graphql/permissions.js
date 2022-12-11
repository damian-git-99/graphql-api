const { rule, shield, allow } = require('graphql-shield');

const isAuthenticated = rule()((parent, args, { authenticatedUser }) => {
  return authenticatedUser !== false;
});

const permissions = shield(
  {
    Query: {
      users: isAuthenticated,
      user: isAuthenticated,
      tasks: isAuthenticated,
      task: isAuthenticated
    },
    Mutation: {
      signIn: allow,
      logIn: allow,
      deleteUser: isAuthenticated,
      deleteTask: isAuthenticated,
    },
    User: {
      tasks: isAuthenticated
    }
  },
  { allowExternalErrors: true }
);

module.exports = { permissions };
