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

  async deleteUserById(id){
    const user = await this.findUserById(id);
    return await user.remove();
  }

  updateUser(user){
    return UserModel.findByIdAndUpdate(user.id, { ...user }, { new: true } )
  }

}

module.exports = UserDao;