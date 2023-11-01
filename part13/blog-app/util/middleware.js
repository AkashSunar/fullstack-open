const { Sequelize } = require("sequelize");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.message === "NOT FOUND") {
    return response.status(400).send({ error: "error occured" });
  }
  if (error instanceof Sequelize.ValidationError) {
    console.log(error.message);
  }
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
module.exports = { errorHandler, unknownEndpoint };
