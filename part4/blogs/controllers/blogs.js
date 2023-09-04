const app = require("express").Router();
const Blog = require("../models/blog")

app.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = app;
