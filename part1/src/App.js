import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  class Statistic {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }
  const statistics = [
    new Statistic("good", good),
    new Statistic("netural", neutral),
    new Statistic("bad", bad),
    new Statistic("all", good + neutral + bad),
    new Statistic("average", (good - bad) / (good + neutral + bad)),
    new Statistic(
      "postive",
      ((1.0 * good) / (good + neutral + bad)) * 100 + "%"
    ),
  ];
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics
        all={good + neutral + bad}
        name="Statistics"
        statistics={statistics}
      ></Statistics>
    </div>
  );
};

// const ButtonGroup = (props) => {
//   return props.map((state, index) => (
//     <Button handleClick={state.handleClick} text={state.text} key={index} />
//   ));
// };
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const FeedBackStatistic = ({ text, number }) => (
  <div>
    {text} {number}
  </div>
);
const FeedBackStatistics = ({ statistics }) => {
  return statistics.map((statistic) => (
    <FeedBackStatistic
      text={statistic.name}
      number={statistic.number}
    ></FeedBackStatistic>
  ));
};
const Statistics = ({ all, name, statistics }) => {
  if (all === 0)
    return (
      <>
        <h1>{name}</h1>
        <p>No Feedback given</p>
      </>
    );

  return (
    <>
      <h1>{name}</h1>
      <FeedBackStatistics statistics={statistics}></FeedBackStatistics>
    </>
  );
};

export default App;
