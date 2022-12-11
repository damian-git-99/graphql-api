const { GraphQLError } = require("graphql");
const TaskDao = require("./TaskDao");

const taskDao = new TaskDao();

class TaskService {

  createTask(task, authenticatedUser) {
    task.user = authenticatedUser;
    return taskDao.createTask(task);
  }

  findTasksByUser(id){
    return taskDao.findTasksByUser(id);
  }

  async findTaskById(id, authenticatedUser) {
    const task = await taskDao.findTaskById(id);

    if (!task) {
      throw new GraphQLError(`Task ${id} Not Found`);
    }

    if (task.user != authenticatedUser) {
      console.log(task.user.toString(), authenticatedUser)
      throw new GraphQLError('Forbidden Action');
    }

    return task;

  }

}

module.exports = TaskService;