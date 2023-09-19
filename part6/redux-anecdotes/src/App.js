import { useSelector, useDispatch } from "react-redux";
import { getId } from "./reducers/anecdoteReducer";
import { createAnecdote, addVote } from "./reducers/anecdoteReducer";
const App = () => {
  const anecdotes = useSelector((state) => {
    return state.sort((val1, val2) => {
      return val2.votes - val1.votes;
    });
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
  };
  const addAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: event.target.newAnecdote.value,
      id: getId(),
      votes: 0,
    };
    dispatch(createAnecdote(newAnecdote));
    event.target.newAnecdote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
