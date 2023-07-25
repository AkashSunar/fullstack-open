const Header = ({ headertext }) => {
  return <h2>{headertext}</h2>;
};
const Content = ({ val }) => {
  return (
    <div>
      {val.map((element) => (
        <Part
          key={element.id}
          name={element.name}
          exercises={element.exercises}
        />
      ))}
    </div>
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
        <div key={value.id}>
          <Header headertext={value.name} />
          <Content val={value.parts}  />
          <Total val={value.parts} />
        </div>
      ))}
    </div>
  );
};
export default Course;
