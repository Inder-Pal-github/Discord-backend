const { verfiyTokenSocket } = require("./middlewares/authSocket");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const serverStore = require("./serverStore");


const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const roomCreateHandler  = require("./socketHandlers/roomCreateHandler");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    verfiyTokenSocket(socket, next);
  });

  // online user emitter
  const emitOnlineUser = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    // new connection handler
    newConnectionHandler(socket, io);
    emitOnlineUser();

    // listen for direct message
    socket.on("direct-message",(data)=>{
      directMessageHandler(socket,data);
    })

    // direct-chat-history
    socket.on("direct-chat-history",(data)=>{
      console.log("directchathistory backedn")
      directChatHistoryHandler(socket,data);
    })

    // room -create
    socket.on("room-create",()=>{
      roomCreateHandler(socket);
    })

    // Disconnect handler
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });
  // interval to update online users every 8 seconds
  setInterval(() => {
    emitOnlineUser();
  }, 10000);
};
module.exports = {
  registerSocketServer,
};
