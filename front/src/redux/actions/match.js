import { matchApi } from "utils/api";

const Actions = {
  setMatch: match => {
    return {
      type: "MATCH:SET_MATCH",
      payload: match
    };
  },
  fetchMatch: match_id => dispatch => {
    console.log("match_id", match_id);
    matchApi
      .getMatch(match_id)
      .then(data => {
        console.log("datas", data);
        dispatch(Actions.setMatch(data.data));
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};

export default Actions;
