import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import store from "redux/store";
import { profileActions } from "redux/actions";

import Paper from "@material-ui/core/Paper";

import { MatchInfo } from "components";
import "./Profile.scss";

import Button from "@material-ui/core/Button";

const Profile = ({ match, info, matches, rating, fetchProfile }) => {
  const history = useHistory();
  let _id;
  if (match.params.id) {
    _id = match.params.id;
  } else {
    _id = store.getState().user.data._id;
  }

  if (info._id !== _id) fetchProfile({ userId: _id });

  const startGame = () => {
    history.push("/startgame");
  };

  return (
    <Paper className="profile">
      <div className="profile__info">
        <img
          src={
            info.avatar
              ? info.avatar
              : "https://banner2.cleanpng.com/20180128/yvw/kisspng-ninja-ico-icon-black-ninja-5a6dee087cdc18.5588411915171538005114.jpg"
          }
          alt=""
        />
        <h2>
          {info.first_name} {info.last_name}
        </h2>
        <p>@{info.username}</p>
        <p>{info.email}</p>
        <div className="profile__info-stat">
          <p>Wins : {rating.wins}</p>
          <p>Losing : {rating.losing}</p>
          {/* <p>Stat : {(100 / (rating.wins + rating.losing)) * rating.wins}%</p> */}
          <p>Rating : {rating.rating}</p>
          <p>Position in rating : {rating.ratingNumber}</p>
        </div>
      </div>
      <div className="profile__start-game">
        <Button
          onClick={startGame}
          className="submit-btn"
          variant="contained"
          color="primary"
        >
          StartGame!
        </Button>
      </div>
      <div className="profile__games">
        {matches && <MatchInfo matches={matches} owner_id={info._id} />}
      </div>
    </Paper>
  );
};

// const data = {
//   info,
//   matches,
//   rating
// };

// const info = {
//   _id,
//   first_name,
//   last_name,
//   username,
//   email
// };

// const matches = [
//   {
//     users
//     games: [
//       {
//         users: [{user, type}]
//         field: [{ isEmpty, state, isMe }],
//         winnerId
//       }
//     ],
//     date
//   }
// ];

// const rating = { wins, losing };

export default connect(
  ({ user, profile }) => ({
    _id: user.data._id,
    info: profile.info,
    matches: profile.matches,
    rating: profile.rating
  }),
  profileActions
)(Profile);
