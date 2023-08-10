import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personServices from "./services/phonebook";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setfilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification,setNotification]=useState("")

  useEffect(() => {
    let myAxiosPromise = personServices.getAll();
    myAxiosPromise.then((myResult) => {
      setPersons(myResult.data);
    });
  }, []);

  const addContact = () => {
    let newPerson = { name: newName, number: newNumber };
    let postPromise = personServices.create(newPerson);

    postPromise.then((result) => {
      setPersons(persons.concat(result.data));
    }).catch(e=>console.log(e));
  };
  const updateNum = () => {
   
    setPersons(persons.map(val => val.name === newName ? {...val,number:newNumber}:val))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let personsArray = persons.map((val) => {
      return val.name;
    });
    !personsArray.includes(newName)
      ? addContact()
      : window.confirm(
          newName +
            " is already added to the phonebook,replace the old number with a new one "
        )
      ? updateNum()
        : null;
    setNotification(`Added ${newName}`);
    setTimeout(() => { setNotification("")},2000);
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNum = (event) => {
    setNewNumber(event.target.value);
  };
  const showVal = persons.filter((val) => {
    return filterName.length === 0
      ? true
      : val.name.toLowerCase().startsWith(filterName.toLowerCase());
  });
  const handleFilterName = (event) => {
    setfilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter handleFilterName={handleFilterName} />
      <h2>add a new</h2>
      <PersonForm
        handleChange={handleChange}
        handleNum={handleNum}
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={showVal} setPersons={setPersons} notification={setNotification} />
    </div>
  );
};

export default App;
