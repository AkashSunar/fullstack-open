import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + bad + neutral;
  let avg = (good - bad) / all;
  let positive = good / all;
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
        <h1>statistics</h1>
      </div>
      <div>
        <p>good:{good}</p>
        <p>neutral:{neutral}</p>
        <p>bad:{bad}</p>
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
    </>
  );
};

export default App;
