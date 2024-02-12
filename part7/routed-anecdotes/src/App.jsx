import { useState } from "react";
import AnecdoteList from "./components/AnecdoteList";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Menu from "./components/Menu";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const displayNotification = (anecdote) => {
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const addNew = (anecdote) => {
    console.log(anecdote,"checking anecdote")
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    displayNotification(anecdote);
    navigate("/");
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <div>{notification}</div> : null}
      <Routes>
        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} addNew={addNew} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
