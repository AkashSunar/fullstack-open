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
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
const Header = ({ course }) => {
  return <h1>{course} </h1>;
};
const Content = (props) => {
  return props.parts.map((val, index) => (
    <Part part={val.name} exercises={val.exercises} key={index} />
  ));
};
const Total = (props) => {
  let sum = 0;
  props.parts.map((val) => {
    sum = +val.exercises;
  });
  return <p>Number of exercises {sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

export default App;
