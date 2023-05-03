class BadCredentials extends Error {
  constructor(message){
    super(message);
    this.extensions = { code: 'UNAUTHORIZED' };
  }
}

module.exports = BadCredentials;