import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setfilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    let myAxiosPromise = axios.get("http://localhost:3001/persons");
    myAxiosPromise.then((myResult) => {
      setPersons(myResult.data);
      console.log("hello");
    });
  }, []);

  const addContact = () => {
    let postPromise = axios.post("http://localhost:3001/persons", {
      name: newName,
      number: newNumber,
    });
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
      : val
      ? console.log(val)
      : val.name.toLowerCase().includes(filterName.toLowerCase());
  });
  const handleFilterName = (event) => {
    setfilterName(event.target.value);
  };

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
      <Persons persons={showVal} />
    </div>
  );
};

export default App;
