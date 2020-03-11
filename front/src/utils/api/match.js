import { axios } from "core";

export default {
  initMatch: user_id => axios.post("/match/init", user_id),
  getMatch: match_id => axios.post("/match/get", match_id),

  gameAction: (match_id, game_id, solution) =>
    axios.post("/match/updategame", { match_id, game_id, solution })
  // getGames: matchId => axios.post("/match/getgames", matchId),
  // getMatches: userId => axios.post("/match/getmatches", userId)
};
