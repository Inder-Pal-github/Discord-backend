const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitaions = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");
    // find all active connection of specific userId
    const receiverList = serverStore.getActiveConnections(userId);
    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvitaions: pendingInvitaions ? pendingInvitaions:[],
      });
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
    updateFriendsPendingInvitations
}
