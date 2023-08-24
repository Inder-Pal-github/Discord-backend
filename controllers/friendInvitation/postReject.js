const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends")

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;
    // remove that invitation from friend invitations collection
    const invitationExist = await FriendInvitation.exists({ _id: id });
    if(invitationExist){
        await FriendInvitation.findByIdAndDelete(id);
    }
    // update pending invitations
    friendsUpdates.updateFriendsPendingInvitations(userId);
    return res.status(200).send({ message: "Invite rejected" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again." });
  }
};

module.exports = postReject;
