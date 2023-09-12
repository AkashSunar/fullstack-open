const app = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");

// app.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

app.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    // Handle errors here
    response.status(500).json({ error: "An error occurred" });
  }
});

app.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: "title or url is required" });
    }

    if (!blog.likes) {
      blog.likes = 0;
    }

    const result = await blog.save();
    response.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

app.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: "blog id is missing" });
  }
});

app.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };
  try {
    await Blog.findByIdAndUpdate(request.params.id, blog);
    response.status(204).json(blog);
  } catch (error) {
    response.status(400).json({ error: "id is missing" });
  }
});

module.exports = app;
