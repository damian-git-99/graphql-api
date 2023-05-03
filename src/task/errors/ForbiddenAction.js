class ForbiddenAction extends Error {
  constructor(message){
    super(message);
    this.extensions = { code: '403 Forbidden' };
  }
}

module.exports = ForbiddenAction;