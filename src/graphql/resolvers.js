const UserService = require('../user/UserService');
const userService = new UserService();

const Query = {
  users: async () => await userService.findAllUsers(),
  user: async (root, args) => await userService.findUserById(args.id)
};

const Mutation = {
  signIn: async (root, args) => {
    const user = await userService.signIn(args);
    return user;
  },
  logIn: async (root, args) => {
    const token = await userService.logIn(args);
    return token;
  }
};

module.exports = {
  Query,
  Mutation
};
