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

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});


app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then((addedPerson) => {
    response.json(addedPerson);
  });
});

app.use((request, response, next) => {
  response.status(404).send("the url is not found");
});
const PORT = process.env.PORT?process.env.PORT:3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
