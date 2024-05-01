const jwt = require ('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        throw new UnauthenticatedError('No token provided');
    } 

    try { 
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        throw new UnauthenticatedError('Not authorized');
    }
}

module.exports = authenticationMiddleware;