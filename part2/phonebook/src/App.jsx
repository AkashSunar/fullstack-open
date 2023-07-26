import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with: <input></input>
        </div>
      </form>
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        <div>
          {persons.map((value, index) => {
            return (
              <p key={index}>
                {value.name} {value.number}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
