const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;