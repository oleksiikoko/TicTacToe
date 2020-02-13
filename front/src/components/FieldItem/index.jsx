import React from "react";
import classNames from "classnames";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";

import "./FieldItem.scss";

const FieldItem = ({ _id, isEmpty, isMe, isActive, isCross, onClick }) => {
  const onClickItem = () => {
    onClick(_id);
  };

  return (
    <div onClick={onClickItem} className="field-item">
      {!isEmpty &&
        (isCross ? (
          <CloseIcon
            className={classNames({
              "MuiSvgIcon-root--is-me": isMe,
              "MuiSvgIcon-root--is-not-me": !isMe
            })}
          />
        ) : (
          <RadioButtonUncheckedIcon
            className={classNames({
              "MuiSvgIcon-root--is-me": isMe,
              "MuiSvgIcon-root--is-not-me": !isMe
            })}
          />
        ))}
    </div>
  );
};

export default FieldItem;
