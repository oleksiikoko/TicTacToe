const initialState = {
  match: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "MATCH:SET_MATCH":
      return {
        match: payload
      };
    default:
      return state;
  }
};
