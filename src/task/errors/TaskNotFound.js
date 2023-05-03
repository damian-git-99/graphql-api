class TaskNotFound extends Error {
  constructor(message){
    super(message);
    this.extensions = { code: '404 Not Found' };
  }
}

module.exports = TaskNotFound;