const validator = require('validator');
const { encryptPassword, comparePasswords } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');
const UserDao = require('./UserDao');
const EmailAlreadyTaken = require('./errors/EmailAlreadyTaken');
const InvalidInput = require('./errors/InvalidInput');
const ForbiddenAction = require('../task/errors/ForbiddenAction');
const BadCredentials = require('./errors/BadCredentials');
const userDao = new UserDao();

class UserService {
  async signup(user) {
    const { name, email, password } = user;
    const userExists = await this.findUserByEmail(email);

    if (!validator.isEmail(email)) {
      throw new InvalidInput(`${email} is not a valid email`);
    }

    if (userExists) {
      throw new EmailAlreadyTaken(`Email: ${email} Already taken`);
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
      throw new BadCredentials(`Error: Invalid Password or email`);
    }

    if (!comparePasswords(password, userExists.password)) {
      throw new BadCredentials(`Error: Invalid Password or email`);
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

  deleteUserById(id, authenticatedUser) {
    if (id != authenticatedUser) {
      throw new ForbiddenAction('Forbidden action');
    }
    return userDao.deleteUserById(id);
  }

  updateUser(user){
    return userDao.updateUser(user);
  }
}

module.exports = UserService;
