const TaskDao = require("./TaskDao");

const taskDao = new TaskDao();

class TaskService {

  createTask(task, authenticatedUser) {
    task.user = authenticatedUser;
    return taskDao.createTask(task);
  }

  async findTasksByUser(id){
    return taskDao.findTasksByUser(id);
  }

}

module.exports = TaskService;