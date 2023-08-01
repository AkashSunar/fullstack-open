import personServices from "../services/phonebook"
// import Notification from "./Notification";

const Persons = ({ persons, setPersons,notification }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personServices.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        notification(`Deleted ${name}`);
        setTimeout(()=>{notification("")},2000)
      }).catch((error) => {
        if (error.response.status === 404) {
          notification(`Information of ${name} has already been removed from the server`);
        setTimeout(()=>{notification("")},2000)}
      })
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
