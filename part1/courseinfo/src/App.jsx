const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  );
};
const Content = (props) => {
  return props.parts.map((val, index) => (
    <Part part={val.name} exercises={val.exercises} key={index} />
  ));
};
const Total = (props) => {
  let sum = 0;
  props.parts.map((val) => {
    sum +=val.exercises;
  });
  return <p>Number of exercises {sum}</p>;
};

// *const Part = (props ) => {
//   return (
//     <p>
//       {props.part} {props.exercises}
//     </p>
//   );
// };

//destructuring the props (props.part,props.exercises)=>({part,exercises})
const Part = ({part,exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

export default App;
