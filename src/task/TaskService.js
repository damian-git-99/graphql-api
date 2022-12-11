const { GraphQLError } = require('graphql');
const TaskDao = require('./TaskDao');

const taskDao = new TaskDao();

class TaskService {
  createTask(task, authenticatedUser) {
    task.user = authenticatedUser;
    return taskDao.createTask(task);
  }

  findTasksByUser(id) {
    return taskDao.findTasksByUser(id);
  }

  async findTaskById(id, authenticatedUser) {
    const task = await taskDao.findTaskById(id);

    if (!task) {
      throw new GraphQLError(`Task ${id} Not Found`);
    }

    if (task.user != authenticatedUser) {
      throw new GraphQLError('Forbidden Action', {
        extensions: {
          code: 'Forbidden'
        }
      });
    }

    return task;
  }

  async deleteTaskById(id, authenticatedUser) {
    const task = await this.findTaskById(id, authenticatedUser);
    return await taskDao.deleteTaskById(task.id);
  }
}

module.exports = TaskService;
