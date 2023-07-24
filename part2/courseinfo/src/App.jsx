const Header = ({ headertext }) => {
  return <h2>{headertext}</h2>;
};
const Content = ({ val }) => {
  return (
    <p>
      {val.map((element) => (
        <Part
          key={element.id}
          name={element.name}
          exercises={element.exercises}
        />
      ))}
    </p>
  );
};
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};
const Total = ({ val }) => {
  let sum = val.reduce((accumulator, curVal) => {
    return accumulator + curVal.exercises;
  }, 0);
  return <h4>total of {sum} exercises</h4>;
};
const Course = ({ courses }) => {
  return (
    <div>
      {console.log(courses)}
      {courses.map((value) => (
        <>
          <Header headertext={value.name} key={value.id} />
          <Content val={value.parts} key={value.id} />
          <Total val={value.parts} />
        </>
      ))}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Course courses={courses} />
      {/* <Content course={courses} /> */}
      {/* <Total parts={ courses[0].parts} /> */}
    </div>
  );
};

// const Part = (props) => {
//   return (
//     <p>
//       {props.part} {props.exercises}
//     </p>
//   );
// };
// const Total = (props) => {
//   let sum = props.parts.reduce((accumulator, curVal) => {
//     return accumulator + curVal.exercises;
//   }, 0);
//   // props.parts.map((val) => {
//   //   sum += val.exercises;
//   // });
//   return <h4>total of {sum} exercises</h4>;
// };
export default App;
