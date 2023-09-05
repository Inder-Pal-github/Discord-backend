const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;
  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRooms(roomId);
  serverStore.joinActiveRoom(roomId, participantDetails);

  // send info to user in room that they should prepare for incoming connection
  roomDetails.forEach((roomDetail) => {
    roomDetail.participants.forEach((participant) => {
      if (participant.socketId !== participantDetails.socketId) {
        socket.to(participant.socketId).emit("conn-prepare", {
          connUserSocketId: participantDetails.socketId,
        });
      }
    });
  });

  roomsUpdates.updateRooms();
};

module.exports = roomJoinHandler;
