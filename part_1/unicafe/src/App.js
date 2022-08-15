import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.allReactions === 0) {
    return (
      <>
        <h3>Statistics</h3>
        <p> No feedback given </p>
      </>
    );
  }
  return (
    <>
      <h3>statistics</h3>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={props.allReactions} />
      <StatisticsLine
        text="average"
        value={(props.good - props.bad) / props.allReactions}
      />
      <StatisticsLine
        text="positive"
        value={(props.good / props.allReactions) * 100 + '%'}
      />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allReactions, setAll] = useState(0);
  console.log('app is working');

  const handleGood = () => {
    // console.log('bad is added');
    setAll(allReactions + 1);
    setGood(good + 1);
  };

  const handleBad = () => {
    // console.log('bad is added');
    setAll(allReactions + 1);
    setBad(bad + 1);
  };

  const handleNeutral = () => {
    // console.log('bad is added');
    setAll(allReactions + 1);
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        allReactions={allReactions}
      />
    </div>
  );
};

export default App;
