const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const morgan = require("morgan");
morgan.token("body", (req, res)=> 
  JSON.stringify(req.body)
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
let myDate = new Date();
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/api/persons", (request, response) => {
  response.json(persons);
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
  console.log(myNewPost);
});

app.use((request, response, next) => {
  response.status(404).send("the url is not found");
});
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
