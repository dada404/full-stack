import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <FeedBackState text="good" time={good}></FeedBackState>
      <FeedBackState text="neutral" time={neutral}></FeedBackState>
      <FeedBackState text="bad" time={bad}></FeedBackState>
      <FeedBackState
        text="average"
        time={(good - bad) / (good + neutral + bad)}
      ></FeedBackState>
      <FeedBackState
        text="positive"
        time={good / (good + neutral + bad)}
      ></FeedBackState>
    </div>
  );
};

// const ButtonGroup = (props) => {
//   return props.map((state, index) => (
//     <Button handleClick={state.handleClick} text={state.text} key={index} />
//   ));
// };
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const FeedBackState = (props) => (
  <div>
    {props.text} {props.time}
  </div>
);

export default App;
