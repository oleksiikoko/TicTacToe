import axios from "axios";

axios.defaults.baseURL = "https://pet-tictactoe-back.herokuapp.com";
axios.defaults.headers.common["token"] = window.localStorage.token;

window.axios = axios;

export default axios;
