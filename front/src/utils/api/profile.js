import { axios } from "core";

export default {
  getInfo: userId => axios.post("/profile/info", userId),
  getMatches: userId => axios.post("/profile/matches", userId),

  getRating: userId => axios.post("/rating/get", userId)
};
