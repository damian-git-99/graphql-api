const TaskService = require('../task/TaskService');
const UserService = require('../user/UserService');
const userService = new UserService();
const taskService = new TaskService();

const Query = {
  users: async () => await userService.findAllUsers(),
  user: async (root, args) => await userService.findUserById(args.id),
  tasks: async (root, args, { authenticatedUser }) => {
    return await taskService.findTasksByUser(authenticatedUser);
  } 
};

const Mutation = {
  signIn: async (root, args) => {
    const user = await userService.signIn(args);
    return user;
  },
  logIn: async (root, args) => {
    const token = await userService.logIn(args);
    return token;
  },
  deleteUser: async (root, args) => {
    await userService.deleteUserById(args.id);
    return args.id;
  },
  createTask: async (root, args, { authenticatedUser } ) => {
      return await taskService.createTask(args, authenticatedUser);
  }
};

const User = {
  tasks: async (user, args) => {
    return await taskService.findTasksByUser(user.id);
  }
}

module.exports = {
  Query,
  Mutation,
  User
};
