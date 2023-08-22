const { addNewConnectedUser } = require("../serverStore");
const { updateFriendsPendingInvitations } = require("./updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });
  // update pending invitation list
  updateFriendsPendingInvitations(userDetails.userId);
};

module.exports = newConnectionHandler;
