const TaskService = require('../task/TaskService');
const UserService = require('../user/UserService');
const userService = new UserService();
const taskService = new TaskService();

const Query = {
  users: async () => await userService.findAllUsers(),
  user: async (root, args) => await userService.findUserById(args.id),
  tasks: async (root, args, { authenticatedUser }) => {
    return await taskService.findTasksByUser(authenticatedUser);
  },
  task: async (root, args, { authenticatedUser }) => {
    return await taskService.findTaskById(args.id, authenticatedUser);
  } 
};

const Mutation = {
  signup: async (root, args) => {
    const user = await userService.signup(args);
    return user;
  },
  logIn: async (root, args) => {
    const token = await userService.logIn(args);
    return token;
  },
  deleteUser: async (root, args, { authenticatedUser }) => {
    return await userService.deleteUserById(args.id, authenticatedUser);
  },
  updateUser: async (root, args) => {
    return await userService.updateUser({ ...args });
  },
  createTask: async (root, args, { authenticatedUser } ) => {
      return await taskService.createTask(args, authenticatedUser);
  },
  deleteTask: async (root, args, {authenticatedUser}) => {
    return await taskService.deleteTaskById(args.id, authenticatedUser);
  },
  updateTask: async (root, args) => {
    return await taskService.updateTask({ ...args })
  }
};

const User = {
  tasks: async (user, args) => {
    return await taskService.findTasksByUser(user.id);
  }
}

const Task = {
  user: async (task) => await userService.findUserById(task.user) 
}

module.exports = {
  Query,
  Mutation,
  User,
  Task
};
