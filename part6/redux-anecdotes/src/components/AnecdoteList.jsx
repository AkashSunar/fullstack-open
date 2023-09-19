import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
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

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
