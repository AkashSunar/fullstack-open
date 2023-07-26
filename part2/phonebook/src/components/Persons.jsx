const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((value, index) => {
        return (
          
            <p key={index}>
              {value.name} {value.number}
            </p>
         
        );
      })}
    </div>
  );
};
export default Persons;
