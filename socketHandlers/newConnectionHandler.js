const { addNewConnectedUser } = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("./updates/friends");
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

  // update rooms list after 500 milliseconds. ( as forEach is taking time to run on frontend side);
  setTimeout(() => {
    updateRooms(socket.id);
  }, 500);
};

module.exports = newConnectionHandler;
