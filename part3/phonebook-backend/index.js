const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const morgan = require("morgan");

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
let myDate = new Date();
let persons = [];
app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people<br> ${myDate} </p>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      result
        ? response.json(result)
        : response
            .status(404)
            .send(`There is no person info at id ${request.params.id}`);
    })
    .catch((e) => {
      next(e);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end("Item  is deleted");
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((addedPerson) => {
      response.json(addedPerson);
    })
    .catch((e) => {
      next(e);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.content,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((addedPerson) => {
      response.json(addedPerson);
    })
    .catch((error) => next(error));
});

app.use((request, response, next) => {
  response.status(404).send("the url is not found");
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
