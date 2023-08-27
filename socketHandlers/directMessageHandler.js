const Message = require("../models/message");
const Conversation = require("../models/conversation");
const chatUpdate = require("./updates/chat");
const directMessageHandler = async (socket, data) => {
  try {
    console.log("direct message event handling going on....");

    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    // create a new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });
    console.log(message);
    // find if conversation exist with this two users or create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      // perform and update to sender and receiver if is online.
      chatUpdate.updateChatHistory(conversation._id.toString());
    } else {
      // if conversation is just started -create a new one.
      const newConversation = await Conversation.create({
        participants: [userId, receiverUserId],
        messages: [message._id],
      });
      // perform and update to sender and receiver if is online.
      chatUpdate.updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directMessageHandler;
