import { createSlice } from "@reduxjs/toolkit";


export const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState:[],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload);
    },
    addVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
  },
});

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_VOTE":
//       return state.map((anecdote) =>
//         anecdote.id === action.payload
//           ? { ...anecdote, votes: anecdote.votes + 1 }
//           : anecdote
//       );
//     case "ADD_ANECDOTE":
//       return state.concat(action.payload);
//     default:
//       return state;
//   }
// };
// const createAnecdote = (newAnecdote) => {
//   return {
//     type: "ADD_ANECDOTE",
//     payload: newAnecdote,
//   };
// };
// const addVote = (id) => {
//   return { type: "ADD_VOTE", payload: id };
// };
export const { createAnecdote, addVote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
