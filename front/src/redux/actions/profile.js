import { profileApi } from "utils/api";

const Actions = {
  setInfo: profile => ({
    type: "PROFILE:SET_INFO",
    payload: profile
  }),
  setMatches: matches => ({
    type: "PROFILE:SET_MATCHES",
    payload: matches
  }),
  setRating: rating => ({
    type: "PROFILE:SET_RATING",
    payload: rating
  }),
  fetchInfo: userId => dispatch => {
    profileApi
      .getInfo(userId)
      .then(info => {
        // console.log("info", info.data);
        dispatch(Actions.setInfo(info.data));
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  fetchMatches: userId => dispatch => {
    profileApi
      .getMatches(userId)
      .then(matches => {
        // console.log("matches", matches);
        dispatch(Actions.setMatches(matches.data.reverse()));
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  fetchRating: userId => dispatch => {
    profileApi
      .getRating(userId)
      .then(rating => {
        console.log("rating", rating);
        dispatch(Actions.setRating(rating.data));
      })
      .catch(err => console.log("err", err));
  },
  fetchProfile: userId => dispatch => {
    console.log("userId", userId);
    dispatch(Actions.fetchInfo(userId));
    dispatch(Actions.fetchMatches(userId));
    dispatch(Actions.fetchRating(userId));
  }
};

export default Actions;
