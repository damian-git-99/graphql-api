const mongoose = require('mongoose');
const TaskModel = require('../task/TaskModel');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("remove", async function (next) {
  await TaskModel.deleteMany({ user: this._id });
  next();
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
