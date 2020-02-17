import React from "react";
import Grid from "@material-ui/core/Grid";

import { FieldItem } from "../";

import "./Field.scss";

const FormRow = ({ fieldRow, onItemClick }) => {
  return (
    <React.Fragment>
      {fieldRow.map(item => (
        <Grid item>
          {!item.isEmpty ? (
            <FieldItem
              _id={item.key}
              isEmpty={false}
              isMe={item.player === "1"}
              isCross={item.value === "x"}
              onClick={onItemClick ? null : onItemClick}
            />
          ) : (
            <FieldItem _id={item._id} isEmpty={true} onClick={onItemClick} />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
};

const Field = ({ field, onItemClick }) => {
  return (
    <div className="game__field">
      <Grid container>
        <Grid container item>
          <FormRow fieldRow={field.slice(0, 3)} onItemClick={onItemClick} />
        </Grid>
        <Grid container item>
          <FormRow fieldRow={field.slice(3, 6)} onItemClick={onItemClick} />
        </Grid>
        <Grid container item>
          <FormRow fieldRow={field.slice(6, 9)} onItemClick={onItemClick} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Field;
