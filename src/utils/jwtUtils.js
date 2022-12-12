const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const token = jwt.sign({ ...payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: '12h'
  });
  return token;
};

const verifyToken = (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return { 
    id
  } 
}

module.exports = {
  generateToken,
  verifyToken
};
