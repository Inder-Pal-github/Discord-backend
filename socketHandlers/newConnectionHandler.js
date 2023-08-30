const { addNewConnectedUser } = require("../serverStore");
const { updateFriendsPendingInvitations,updateFriends } = require("./updates/friends");
const { updateRooms } = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });
  // update pending invitation list
  updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  updateFriends(userDetails.userId);

  // update rooms list
  updateRooms(socket.id);
};

module.exports = newConnectionHandler;
