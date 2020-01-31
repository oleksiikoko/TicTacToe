import React from "react";

import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";

import "./index.scss";

function App() {
  return (
    <div className="wrapper">
      <div className="field-item">
        <RadioButtonUncheckedIcon style={{ "font-size": "100px" }} />
        <CloseIcon style={{ "font-size": "100px" }} />
      </div>
    </div>
  );
}

export default App;
