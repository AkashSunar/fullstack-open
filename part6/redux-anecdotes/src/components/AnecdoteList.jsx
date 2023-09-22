import { useDispatch, useSelector } from "react-redux";
import { addVote, updateVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  addNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    state = JSON.parse(JSON.stringify(state));
    return state.anecdotes.sort((val1, val2) => {
      return val2.votes - val1.votes;
    });
  });
  const filterQuery = useSelector((state) => state.filterAnecdotes);
  const anecdotesToShow = anecdotes.filter((anecdote) =>
    filterQuery
      ? anecdote.content.toLowerCase().includes(filterQuery.toLowerCase())
      : anecdote
  );

  const vote = (anecdote) => {
    const updatedAnecdote = {...anecdote,votes:anecdote.votes+1}
    dispatch(updateVote(updatedAnecdote));
    // dispatch(addNotification(`you voted "${anecdote.content}"`));
    // setTimeout(() => dispatch(removeNotification()), 5000);
    dispatch(setNotification(`you voted "${anecdote.content}"`, 5));
  };
  

  return (
    <>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
