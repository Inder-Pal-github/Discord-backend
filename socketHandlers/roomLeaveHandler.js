const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = serverStore.getActiveRoom(roomId);
  if (activeRoom) {
    serverStore.leaveActionRoom(roomId, socket.id);

    const updatedActiveRoom = serverStore.getActiveRoom(roomId);
    if(updatedActiveRoom){
      //send the new list of users in this room to all clients that are connected
      updatedActiveRoom.participants?.forEach((participant)=>{
        socket.to(participant.socketId).emit("room-participant-left",{
          connUserSocketId:socket.id
        })
      })
    }

    roomsUpdates.updateRooms();
  }
};
module.exports = roomLeaveHandler;
