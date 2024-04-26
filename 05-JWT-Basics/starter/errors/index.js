const CustomAPIError = require('./custom-error')    // Importing the CustomAPIError class   
const BadRequestError = require('./bad-request') 
const UnauthenticatedError = require('./unauthenticated') 

module.exports = {CustomAPIError, BadRequestError, UnauthenticatedError}