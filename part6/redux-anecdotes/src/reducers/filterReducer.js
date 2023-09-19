const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const createFilterVal = (val) => {
  return {
    type: "SET_FILTER",
    payload: val,
  };
};
export default filterReducer;
