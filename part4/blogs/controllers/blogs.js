const app = require("express").Router();
const Blog = require("../models/blog");

app.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/", (request, response, next) => {
  const blog = new Blog(request.body);
  
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title or url is required" });
  }

  // const myBlog = request.body;
  // if (!myBlog.title || !myBlog.url) {
  //   return response.status(400).json({ error: "title or url is required" });
  // }

  if (!blog.likes) {
    blog.likes = 0;
  }
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
