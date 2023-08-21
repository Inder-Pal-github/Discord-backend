const { verfiyTokenSocket } = require("./middlewares/authSocket");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const serverStore = require("./serverStore");

const newConnectionHandler = require("./socketHandlers/newConnectionHandler");

const registerSocketServer = (server)=>{
    const io = require("socket.io")(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    })

    serverStore.setSocketServerInstance(io);

    io.use((socket,next)=>{
        verfiyTokenSocket(socket,next);
    })

    io.on("connection",(socket)=>{
        console.log("User connected: ",socket.id)
        // console.log(socket.handshake.auth);
        // new connection handler
        newConnectionHandler(socket,io);


        // Disconnect handler
        socket.on("disconnect",()=>{
            disconnectHandler(socket);
        })
    })
}
module.exports = {
    registerSocketServer
}