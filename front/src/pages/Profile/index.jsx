import React from "react";
import Paper from "@material-ui/core/Paper";

import "./Profile.scss";
import GameInfo from "../../components/GameInfo";

const Profile = () => {
  const user = {
    avatar:
      "https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    fullname: "Oleksii Kovalchuk",
    email: "oleksiij.ko@gmail.com",
    wins: "5",
    losing: "0",
    rait: "1"
  };

  const matchDate = new Date();
  const games = [
    { enemyName: "Any Name", myScore: "3", enemyScore: "2", date: matchDate },
    { enemyName: "Any Name", myScore: "3", enemyScore: "2", date: matchDate },
    { enemyName: "Any Name", myScore: "3", enemyScore: "2", date: matchDate }
  ];

  return (
    <Paper className="profile">
      {/* <div className="profile"> */}
      <div className="profile__info">
        <img src={user.avatar} alt="" />
        <h2>{user.fullname}</h2>
        <p>{user.email}</p>
        <div className="profile__info-stat">
          <p>Wins : {user.wins}</p>
          <p>Losing : {user.losing}</p>
          <p>Stat : {(100 / (user.wins + user.losing)) * user.wins}%</p>
          <p>Rait : {user.rait}</p>
        </div>
      </div>
      <div className="profile__games">
        <GameInfo games={games} />
      </div>
    </Paper>
  );
};

export default Profile;
