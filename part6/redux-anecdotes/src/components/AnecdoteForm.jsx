import { useDispatch } from "react-redux";
import { getId } from "../reducers/anecdoteReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

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
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
