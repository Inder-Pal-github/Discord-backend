const { removeConnectedUser, getActiveRooms } = require("../serverStore");
const roomLeaveHandler = require("./roomLeaveHandler");
const { updateRooms } = require("./updates/rooms");

const disconnectHandler = (socket)=>{
    // check if this user in room if yes remove from room also.
    const activeRooms = getActiveRooms();
    activeRooms.forEach((activeRoom)=>{
        const userInRoom = activeRoom.participants.some(participant => participant.socketId === socket.id);
        if(userInRoom){
            // remove from each room.
            roomLeaveHandler(socket,{roomId:activeRoom.roomId});
            updateRooms();
        }
    })
    removeConnectedUser(socket.id);
}

module.exports = disconnectHandler;