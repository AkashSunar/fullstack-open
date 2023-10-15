const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { url } = require("./utils/config");
const Blog = require("./models/blog");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");

app.use(cors());
app.use(express.json());

mongoose.connect(url);

app.use(requestLogger);

app.use("/api/blogs/", tokenExtractor, blogRouter);
app.use("/api/users/", userRouter);
app.use("/api/login/", loginRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
