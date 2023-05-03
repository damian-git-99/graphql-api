const TaskDao = require('./TaskDao');
const TaskNotFound = require('./errors/TaskNotFound');

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
      throw new TaskNotFound('Task not found');
    }

    if (task.user != authenticatedUser) {
      throw new ForbiddenAction('Forbidden action');
    }

    return task;
  }

  async deleteTaskById(id, authenticatedUser) {
    const task = await this.findTaskById(id, authenticatedUser);
    return await taskDao.deleteTaskById(task.id);
  }

  updateTask(task){
    return taskDao.updateTask(task);
  }
}

module.exports = TaskService;
