class TaskNotFound extends Error {
  constructor(message){
    super(message);
    this.name = this.constructor.name;
    this.extensions = { code: '404 Not Found' };
  }
}

module.exports = TaskNotFound;