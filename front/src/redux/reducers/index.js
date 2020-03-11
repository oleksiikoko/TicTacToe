import { combineReducers } from "redux";

import user from "./user";
import match from "./match";
import profile from "./profile";

export default combineReducers({
  user,
  match,
  profile
});
