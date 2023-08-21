const jwt = require("jsonwebtoken");


const config = process.env;

const verfiyTokenSocket = (socket,next)=>{
    const token = socket.handshake.auth?.token;
    try {
        const decoded = jwt.verify(token,config.JWT_TOKEN_KEY)
        socket.user = decoded
    } catch (err) {
        const socketError = new Error("Not authorized");
        return next(socketError);
    }
    next();
}

module.exports = {verfiyTokenSocket};