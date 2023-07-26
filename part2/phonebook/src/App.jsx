import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filterName, setfilterName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let personsArray = persons.map((val) => {
      return val.name;
    });

    !personsArray.includes(newName)
      ? setPersons(persons.concat({ name: newName, number: newNumber }))
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
  const showVal = persons.filter((val) =>
    filterName.length === 0
      ? true
      : val.name.toLowerCase().startsWith(filterName.toLowerCase())
  );
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
