const TaskModel = require("./TaskModel");

class TaskDao {

  createTask(task) {
    return TaskModel.create({ ...task });
  }

  findTasksByUser(id){
    return TaskModel.find({ user: id });
  }

  findTaskById(id) {
    return TaskModel.findById(id);
  }

  deleteTaskById(id){
    return TaskModel.findByIdAndRemove(id);
  }

}

module.exports = TaskDao;