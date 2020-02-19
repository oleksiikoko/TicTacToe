const ChatModel = require("../models/Chat");

class ChatController {
  create = (req, res) => {
    const postData = {
      game: req.body.gameId
    };

    const chat = new ChatModel(postData);

    chat
      .save()
      .then(obj => {
        res.json(obj);
      })
      .catch(reason => {
        res.status(500).json({
          status: "error",
          message: reason
        });
      });
  };
}

exports.ChatController = ChatController;
