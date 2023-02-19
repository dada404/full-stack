const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course}> </Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};
const Content = (props) => {
  return props.parts.map((part, index) => (
    <Part part={part} key={index}></Part>
  ));
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = (props) => {
  const sum = props.parts.reduce((ac, cur) => ac + cur.exercises, 0);

  return <p>Number of exercises {sum}</p>;
};

export default App;
