const CustomAPIError = require('./custom-error')    // Importing the CustomAPIError class
const {StatusCodes} = require('http-status-codes');

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
      super(message)
      console.log(StatusCodes.UNAUTHORIZED); 
      this.statusCode = StatusCodes.UNAUTHORIZED  // Setting the status code to 401
    }
  }
  
  module.exports = UnauthenticatedError 