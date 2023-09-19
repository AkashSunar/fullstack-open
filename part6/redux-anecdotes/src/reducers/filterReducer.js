import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name:"filter",
  initialState:"",
  reducers: {
    createFilterVal(state, action) {
      return action.payload;
    },
  },
});
export const { createFilterVal } = filterSlice.actions;
export default filterSlice.reducer;

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const createFilterVal = (val) => {
//   return {
//     type: "SET_FILTER",
//     payload: val,
//   };
// };
// export default filterReducer;
