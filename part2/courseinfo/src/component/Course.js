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
  return <h2>{props.course}</h2>;
};
const Content = (props) => {
  return props.parts.map((part) => <Part part={part} key={part.id}></Part>);
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

  return <b>Number of exercises {sum}</b>;
};

export default Course;
