import React from "react";
import format from "date-fns/format";
import classNames from "classnames";

import "./Message.scss";

const Message = ({ text, date, isMe }) => {
  return (
    <div className={classNames("message", { "message--is-me": isMe })}>
      <div className="message__cnt">
        <p className="message__cnt-text">{text}</p>
        <p className="message__cnt-date">{format(date, "HH:mm")}</p>
      </div>
    </div>
  );
};

// Message.propTypes = {
//   isMe: PropTypes.bool
// };

export default Message;
