const initialState = {
  info: {
    _id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: ""
  },
  matches: null,
  rating: {
    wins: 0,
    losing: 0,
    rating: 0,
    ratingNumber: 0
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "PROFILE:SET_INFO":
      return {
        ...state,
        info: payload
      };
    case "PROFILE:SET_MATCHES":
      return {
        ...state,
        matches: payload
      };
    case "PROFILE:SET_RATING":
      return {
        ...state,
        rating: payload
      };
    default:
      return state;
  }
};
