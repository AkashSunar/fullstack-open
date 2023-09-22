import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/requests";
import { useReducer } from "react";
import NotificationContext from "./NotificationContext";
import { useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_NOTIFICATION":
      return action.payload;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  // const[notification,notificationDispatch]=useContext(NotificationContext)

  const queryClient = useQueryClient();
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: "DISPLAY_NOTIFICATION",
      payload: `anecdote "${anecdote.content}" voted`,
    });
    setTimeout(() => notificationDispatch({type:"REMOVE_NOTIFICATION"}), 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  if (result.isError) {
    return (
      <span>anecdote service not available due to problems in server</span>
    );
  }
  const anecdotes = result.data;

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>
      {notification ? <Notification /> : null}
      {/* <Notification /> */}
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </NotificationContext.Provider>
  );
};

export default App;
