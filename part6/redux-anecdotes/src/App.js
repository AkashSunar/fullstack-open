import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeAnecdotes} from "./reducers/anecdoteReducer";
import anecdotes from "./services/anecdotes";
const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  useEffect(() => {
    // services.getAll().then((response) => {
    //   dispatch(createAnecdote(response));
    // });
    dispatch(initializeAnecdotes(anecdotes))
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification ? <Notification /> : null}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};
export default App;
