import React from "react";
import format from "date-fns/format";
import classNames from "classnames";

import "./Message.scss";

const Message = ({ isMe }) => {
  const curDate = format(new Date(), "HH:mm");
  console.log(curDate);
  return (
    <div className={classNames("message", { "message--is-me": isMe })}>
      <div className="message__cnt">
        <p className="message__cnt-text">TextMessage</p>
        <p className="message__cnt-date">{curDate}</p>
      </div>
    </div>
  );
};

// Message.propTypes = {
//   isMe: PropTypes.bool
// };

export default Message;
