// require("dotenv").config();

const express = require("express");
const app = express();

const { PORT } = require("./util/config")
const { connectToDatabase } = require("./util/db") 

const blogsRouter = require("./controllers/blogs")
const { errorHandler,unknownEndpoint } = require("./util/middleware")


app.use(express.json());

app.use("/api/blogs", blogsRouter)

app.use(errorHandler)
app.use(unknownEndpoint);

// const PORT = process.env.PORT;
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();