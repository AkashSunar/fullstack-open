import { useState } from "react";
const Statistics = ({ stats,check }) => {
  let all = stats.good + stats.bad + stats.neutral;
  let avg = (stats.good - stats.bad) / all;
  let positive = stats.good / all;
  return (
    <div>
      <p>good:{stats.good}</p>
      <p>neutral:{stats.neutral}</p>
      <p>bad:{stats.bad}</p>
      <p>all:{all}</p>
      {check ? (
        <div>
          <p>average:{avg}</p>
          <p>positive:{positive}%</p>
        </div>
      ) : (
        <div>
          <p>average:{0}</p>
          <p>positive:{0}%</p>
        </div>
      )}
    </div>
  );
};


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let check = good || neutral || bad;

  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
      </div>
      <div>
        <button onClick={increaseGood}>good</button>
        <button onClick={increaseNeutral}>neutral </button>
        <button onClick={increaseBad}>bad</button>
      </div>
      <div>
        <Statistics stats={{ good, neutral, bad }} check={check} />
      </div>
    </>
  );
};

export default App;
