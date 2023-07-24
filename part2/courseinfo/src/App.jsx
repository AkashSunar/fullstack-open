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
      {
        name: "Redux",
        exercises: 11,
        id:4
      }
    ],
  };

  return (
    <div>
      <Course course={course} />
      <Content course={course} />
      <Total parts={ course.parts} />

    </div>
  );
};
const Course = (props) => {
  return <h1>{props.course.name} </h1>;
};
const Content = (props) => {
  return props.course.parts.map((val, index) => (
    <Part part={val.name} exercises={val.exercises} key={index} />
  ));
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
const Total = (props) => {
  let sum = 0;
  props.parts.map((val) => {
    sum += val.exercises;
  });
  return <h4>total of {sum} exercises</h4>
}
export default App;
