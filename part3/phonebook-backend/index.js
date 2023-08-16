const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Person=require("./models/person")

app.use(express.json());
app.use(cors());
app.use(express.static("dist"))
const morgan = require("morgan");

morgan.token("body", (req, res)=> 
  JSON.stringify(req.body)
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
let myDate = new Date();
let persons = [];
app.get("/api/persons", (request, response) => {
Person.find({}).then((result) =>{response.json(result)});
});
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people<br> ${myDate} </p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const myId = Number(request.params.id);
  const personInfo = persons.find((person) => person.id === myId);
  personInfo //using ternary operato
    ? response.json(personInfo)
    : response.status(404).send(`There is no person info at id ${myId}`);
});
app.delete("/api/persons/:id", (request, response) => {
  const myId = Number(request.params.id);
  persons = persons.filter((person) => person.id !== myId);
  response.status(204).send(`The person info at id ${myId} has been deleted`);
});
app.post("/api/persons", (request, response) => {
  const myNewPost = request.body;
  const myId = Math.floor(Math.random() * 100);
  myNewPost.id = myId;
  if (persons.map((person) => person.name).includes(myNewPost.name)) {
    response.status(404).send("Name must be unique");
  } else if (myNewPost.name === "" || myNewPost.number === "") {
    response.status(404).send("The name or number is missing");
  } else {
    persons.push(myNewPost);
    response.status(200).json(myNewPost);
  }
  // console.log(myNewPost);
  //  const person = new Person({
  //    name: sita,
  //    number: 12345,
  //  });

  //  note.save().then((result) => {
  //    console.log("note saved!");
  //    mongoose.connection.close();
  //  });

});

app.use((request, response, next) => {
  response.status(404).send("the url is not found");
});
const PORT = process.env.PORT?process.env.PORT:3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);