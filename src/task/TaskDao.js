const TaskModel = require("./TaskModel");

class TaskDao {

  createTask(task) {
    return TaskModel.create({ ...task });
  }

  findTasksByUser(id){
    return TaskModel.find({ user: id });
  }

}

module.exports = TaskDao;