const FriendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);
    if (!invitation)
      return res
        .status(401)
        .send({ message: "Error occured, please try again." });

    const { senderId, receiverId } = invitation;
    // add friends to both users
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    // save the updated data
    await senderUser.save();
    await receiverUser.save();

    // delete the invitation from db
    await FriendInvitation.findByIdAndDelete(id);

    // update the list of friends if the users are online
    friendsUpdate.updateFriends(senderId.toString());
    friendsUpdate.updateFriends(receiverId.toString());

    // update list of friends pending invitataion
    friendsUpdate.updateFriendsPendingInvitations(receiverId.toString());

    return res.send({ message: "Invite accepted." });
  } catch (error) {
    console.log(error, "postaccept error");
    return res
      .status(500)
      .send({ message: "Something went wrong please try again." });
  }
};

module.exports = postAccept;
