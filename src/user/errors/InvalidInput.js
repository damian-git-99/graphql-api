class InvalidInput extends Error {
  constructor(message){
    super(message);
    this.extensions = { code: '400 Bad Request' };
  }
}

module.exports = InvalidInput;