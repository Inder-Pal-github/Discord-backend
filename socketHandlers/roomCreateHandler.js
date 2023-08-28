const  { addNewActiveRoom } = require("../serverStore");

const roomCreateHandler = (socket)=>{
    const socketId = socket.id;
    const userId = socket.user.userId;

    const roomDetails = addNewActiveRoom(userId,socketId);

    socket.emit("room-create",{
        roomDetails
    })

}

module.exports = roomCreateHandler;