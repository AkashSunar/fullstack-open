const mongoose = require("mongoose");
require("dotenv").config()

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

// const password = process.argv[2];

const url = process.env.MONGODB_URI;


mongoose.connect(url);
mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
    Person.find({}).then((persons) => {
      console.log("phonebook:")
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name}  number ${number} to phonebook`);
    console.log("person saved!");
    mongoose.connection.close();
  });
}
