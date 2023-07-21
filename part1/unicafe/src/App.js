import { useState } from "react";
const Statistics = ({ stats, check }) => {
  let all = stats.good + stats.bad + stats.neutral;
  let avg = (stats.good - stats.bad) / all;
  let positive = stats.good / all;
  return (
    <div>
      {check ? (
        <div>
          <p>good:{stats.good}</p>
          <p>neutral:{stats.neutral}</p>
          <p>bad:{stats.bad}</p>
          <p>all:{all}</p>
          <p>average:{avg}</p>
          <p>positive:{positive}%</p>
        </div>
      ) : (
        <div>
          <p>no feedback given</p>
        </div>
      )}
    </div>
  );
};
const Button = ({myFunc,text}) => {
  return <button onClick={myFunc}>{text}</button>;
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
        <Button myFunc={increaseGood} text={"good"} />
        <Button myFunc={increaseNeutral} text={"neutral"} />
        <Button myFunc={increaseBad} text={"bad"} />
      </div>
      <div>
        <Statistics stats={{ good, neutral, bad }} check={check} />
      </div>
    </>
  );
};

export default App;
