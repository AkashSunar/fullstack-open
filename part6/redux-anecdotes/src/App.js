import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import services from "./services/anecdotes";
import { createAnecdote } from "./reducers/anecdoteReducer";
const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  useEffect(() => {
    services.getAll().then((response) => {
      dispatch(createAnecdote(response));
    });
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
