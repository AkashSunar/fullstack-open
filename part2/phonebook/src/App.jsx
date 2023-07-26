import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [number, setNumber] = useState([{ number: 9833 }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let personsArray = persons.map((val) => {
      return val.name;
    });

    !personsArray.includes(newName)
      ? setPersons(persons.concat({ name: newName }))
      : alert(newName + " is already added to the phonebook");
    setNumber(number.concat({ number: newNumber }));
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
      <form onSubmit={handleSubmit}>
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
            let num = number[index];
            return (
              <p key={index}>
                {value.name} {num.number}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
