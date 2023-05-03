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
      signup: allow,
      logIn: allow,
      deleteUser: isAuthenticated,
      updateUser: isAuthenticated,
      createTask: isAuthenticated,
      deleteTask: isAuthenticated
    },
    User: {
      tasks: isAuthenticated
    }
  },
  { allowExternalErrors: true }
);

module.exports = { permissions };
