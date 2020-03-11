import { userApi } from "utils/api";

const Actions = {
  setUserData: data => ({
    type: "USER:SET_DATA",
    payload: data
  }),
  setIsAuth: bool => ({
    type: "USER:SET_IS_AUTH",
    payload: bool
  }),
  fetchUserData: () => dispatch => {
    userApi
      .getMe()
      .then(({ data }) => {
        // console.log("data", data.data._doc);
        dispatch(Actions.setUserData(data.data._doc));
      })
      .catch(err => {
        if (err.response.status === 403) {
          dispatch(Actions.setIsAuth(false));
          delete window.localStorage.token;
        }
      });
  },
  fetchUserSignin: postData => dispatch => {
    return userApi
      .signIn(postData)
      .then(({ data }) => {
        const { token } = data;
        window.axios.defaults.headers.common["token"] = token;
        window.localStorage["token"] = token;
        dispatch(Actions.fetchUserData());
        dispatch(Actions.setIsAuth(true));
        return data;
      })
      .catch(response => {
        console.log("fetchUserLogin: response", response);
      });
  },
  fetchUserSignup: postData => dispatch => {
    return userApi
      .signUp(postData)
      .then(() => {
        dispatch(Actions.fetchUserSignin(postData));
      })
      .catch(response => {
        console.log("fetchUserSignup: response", response);
      });
  }
};

export default Actions;
