const UserModel = require("./UserModel");

class UserDao {

  createUser(user) {
    return UserModel.create(user);
  }

  findUserByEmail (email) {
    return UserModel.findOne({ email });
  }

  findAllUsers() {
    return UserModel.find({});
  }

  findUserById(id) {
    return UserModel.findById(id);
  }

}

module.exports = UserDao;