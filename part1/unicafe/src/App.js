import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ stats, check }) => {
  let all = stats.good + stats.bad + stats.neutral;
  let avg = (stats.good - stats.bad) / all;
  let positive = stats.good / all;
  return (
    <div>
      {check ? (
        <div>
          <StatisticLine text="good" value={stats.good} />
          <StatisticLine text="neutral" value={stats.neutral} />
          <StatisticLine text="bad" value={stats.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="avg" value={avg} />
          <StatisticLine text="positive" value={positive} />
        </div>
      ) : (
        <div>
          <p>no feedback given</p>
        </div>
      )}
    </div>
  );
};
const Button = ({ myFunc, text }) => {
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
