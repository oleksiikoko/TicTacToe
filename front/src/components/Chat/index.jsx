import React from "react";

import TextField from "@material-ui/core/TextField";

import { Message } from "components";

import "./Chat.scss";

const Chat = ({ messages }) => {
  return (
    <div className="chat__cnt">
      <div className="chat__cnt--messages">
        {messages &&
          messages.map(item => (
            <Message
              text={item.text}
              date={item.date}
              isMe={item.author === "1"}
            />
          ))}
      </div>
      <div className="chat__cnt-input">
        <TextField id="standard-basic" placeholder="Message" />
      </div>
    </div>
  );
};

export default Chat;
