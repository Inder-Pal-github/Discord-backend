const FriendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const { updateFriendsPendingInvitations } = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;
  // Check if friend that we would like to invite is not user
  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send({ message: "Sorry you cannot become friend with yourself." });
  }
  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });
  if (!targetUser) {
    return res.status(404).send({
      message: `Friend of ${targetMailAddress} has not been found. Please check mail address.`,
    });
  }
  // check if invitation has been already sent.
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });
  if (invitationAlreadyReceived) {
    return res.status(409).send({ message: "Invitation already sent." });
  }
  // check if user which we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );
  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send({ message: "Friend already added. Please check friends list." });
  }
  // create new invitation in database
  const newInvitation = await FriendInvitation.create({
    senderId:userId,
    receiverId:targetUser._id
  })
  // if invitaion has been  successfully created we would like to update friends invitations if other user is online
  // send pending invitations update to spcific user
  updateFriendsPendingInvitations(targetUser._id.toString());
  return res.status(201).send({message:"Invitation sent successfully"});
};

module.exports = postInvite;
