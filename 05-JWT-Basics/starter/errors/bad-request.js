
const CustomAPIError = require('./custom-error')    // Importing the CustomAPIError class
const {StatusCodes} = require('http-status-codes');

class BadRequest extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.Bad_REQUEST   // Setting the status code to 400
    }
}
  
  module.exports = BadRequest