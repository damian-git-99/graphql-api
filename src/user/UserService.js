const { GraphQLError } = require('graphql');
const validator = require('validator');
const { encryptPassword, comparePasswords } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const UserDao = require('./UserDao');

const extensions = {
  code: 'BAD_REQUEST'
};
const userDao = new UserDao();

class UserService {
  async signIn(user) {
    const { name, email, password } = user;
    const userExists = await this.findUserByEmail(email);

    if (!validator.isEmail(email)) {
      throw new GraphQLError(`${email} is not a valid email`, { extensions });
    }

    if (userExists) {
      throw new GraphQLError(`Email: ${email} Already taken`, { extensions });
    }

    const encryptedPassword = encryptPassword(password);

    return await userDao.createUser({
      name,
      email,
      password: encryptedPassword
    });
  }

  async logIn(user) {
    const { email, password } = user;
    const userExists = await this.findUserByEmail(email);

    if (!userExists) {
      throw new GraphQLError(`Error: Invalid Password or email`, {
        extensions
      });
    }

    if (!comparePasswords(password, userExists.password)) {
      throw new GraphQLError(`Error: Invalid Password or email`, {
        extensions
      });
    }

    const token = generateToken({ id: userExists.id });

    return token;
  }

  findUserByEmail(email) {
    return userDao.findUserByEmail(email);
  }

  findAllUsers() {
    return userDao.findAllUsers();
  }

  findUserById(id) {
    return userDao.findUserById(id);
  }
}

module.exports = UserService;
