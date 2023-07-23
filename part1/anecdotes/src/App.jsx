import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [index, setIndex] = useState(null);
  let copyVote = [...votes];
  // console.log(copyVote);

  const generateAnecdotes = () => {
    setSelected(Math.floor(Math.random() * 8));
  };

  const countVote = () => {
    copyVote[selected] += 1;
    setVote([...copyVote]);
    console.log(copyVote);
    const maxnum = Math.max(...copyVote);
    const maxIndex = copyVote.indexOf(maxnum);
    console.log(maxIndex);
    setIndex(maxIndex);
  };

  return (
    <div>
      <h1>Ancedote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} vote</p>
      <div>
        <button onClick={countVote}>vote</button>
        <button onClick={generateAnecdotes}>next anecdote</button>
      </div>
      <h1>Ancedote with the most vote</h1>
      <p> {anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
    </div>
  );
};

export default App;
