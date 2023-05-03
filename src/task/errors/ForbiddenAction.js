class ForbiddenAction extends Error {
  constructor(message){
    super(message);
    this.name = this.constructor.name;
    this.extensions = { code: '403 Forbidden' };
  }
}

module.exports = ForbiddenAction;