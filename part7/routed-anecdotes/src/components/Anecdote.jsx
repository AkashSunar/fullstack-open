import { useParams,Link } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id == id);
  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <Link>{anecdote.info}</Link>
      </p>
    </>
  );
};
export default Anecdote;