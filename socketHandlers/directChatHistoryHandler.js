const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

const directChatHistoryHandler = async (socket, data) => {
  console.log("direct chat history handler",data)
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;
    console.log("direct chathistroy",userId,receiverUserId);
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      // type: "DIRECT",
    });
    console.log("conversation",conversation)
    if(conversation){
        chatUpdates.updateChatHistory(conversation._id.toString(),socket.id);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directChatHistoryHandler;
