const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = serverStore.getActiveRoom(roomId);
  if (activeRoom) {
    serverStore.leaveActionRoom(roomId, socket.id);

    roomsUpdates.updateRooms();
  }
};
module.exports = roomLeaveHandler;
