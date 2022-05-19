class RestError {
  constructor(message, status) {
    this.message = message || "Something went wrong. Please try again.";
    this.status = status || 500;
  }
}

module.exports = RestError;
