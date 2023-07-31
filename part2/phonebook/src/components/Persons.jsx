import personServices from "../services/phonebook"

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (id,name) => {
    // return console.log(`${persons[0].name},${persons[0].id}`);
    if (window.confirm(`Delete ${name}?`)) {
      personServices.deletePerson(id).then(() => {
        setPersons(persons.filter((person)=>person.id !==id))
      }).catch((error)=>{console.log("error deleting the person:",error)})
    }
  };
  return (
    <div>
      {persons.map((value, index) => {
        return (
          <p key={index}>
            {value.name} {value.number}
            <button onClick={()=>handleDelete(value.id,value.name)}>delete</button>
          </p>
        );
      })}
    </div>
  );
};
export default Persons;
