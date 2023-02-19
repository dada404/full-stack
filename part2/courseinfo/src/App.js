const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}> </Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
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
