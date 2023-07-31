import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personServices from "./services/phonebook";
// import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setfilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    let myAxiosPromise = personServices.getAll();
    myAxiosPromise.then((myResult) => {
      setPersons(myResult.data);
      console.log("hello");
    });
  }, []);

  const addContact = () => {
    let newPerson = { name: newName, number: newNumber };
    let postPromise = personServices.create(newPerson);
    //axios.post("http://localhost:3001/persons", {
    // name: newName,
    // number: newNumber,
    // });
    postPromise.then((result) => {
      setPersons(persons.concat(result.data));
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let personsArray = persons.map((val) => {
      return val.name;
    });
    !personsArray.includes(newName)
      ? addContact()
      : alert(newName + " is already added to the phonebook");

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
  // const handleDelete = () => {
  //   return console.log("hello")
  // }
  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={showVal} setPersons={setPersons} />
    </div>
  );
};

export default App;
