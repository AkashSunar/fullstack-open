import { useDispatch } from "react-redux";
import { getId } from "../reducers/anecdoteReducer";
import { makeAnecdote} from "../reducers/anecdoteReducer";
import {setNotificaTion} from "../reducers/notificationReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch();
  

  const addAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: event.target.newAnecdote.value,
      id: getId(),
      votes: 0,
    };
    // const myAnecdote=await services.createNew(newAnecdote)
    dispatch(makeAnecdote(newAnecdote));
    // dispatch(addNotification(`you added "${event.target.newAnecdote.value}"`))
    // event.target.newAnecdote.value = "";
    // setTimeout(()=>dispatch(removeNotification()),5000)
    dispatch(setNotificaTion(`you added "${event.target.newAnecdote.value}"`, 5000));
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
