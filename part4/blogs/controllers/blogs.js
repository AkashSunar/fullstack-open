const app = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// app.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

app.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", { username:1,name:1,id:1});
    response.json(blogs);
  } catch (error) {
    // Handle errors here
    response.status(500).json({ error: "An error occurred" });
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

app.post("/", async (req, response, next) => {
  try {
    const body = req.body;
      const decodedToken = jwt.verify(
        getTokenFrom(req),
        process.env.SECRET
      );
      if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
      }
      const user = await User.findById(decodedToken.id);
    // const user = await User.findById(req.body.userId);
   
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    if (!blog.title || !blog.url) {
      return response.status(400).json({
        error: "title or url is required",
      });
    }

    if (!blog.likes) {
      blog.likes = 0;
    }

    const result = await blog.save();
   response.status(201).json(result);
   user.blog = user.blog.concat(result.id);
    await user.save();
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
