import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
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
    dispatch(addVote(anecdote.id));
    dispatch(addNotification(`you voted "${anecdote.content}"`));
    setTimeout(() => dispatch(removeNotification()), 5000);
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
