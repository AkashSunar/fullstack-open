const app = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

app.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    response.status(500).json({ error: "An error occurred" });
  }
});

app.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    // const decodedToken = jwt.verify(req.token, process.env.SECRET);
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: "token invalid" });
    // }

    const user = request.user;
    const userExist = await User.findById(user);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user,
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
    const newBlog = await Blog.findById(result._id).populate("user", {
      username: 1,
      name: 1,
    });
    response.status(201).json(newBlog);
    userExist.blog = userExist.blog.concat(result._id);
    // user.blog = user.blog.concat(result.id);
    await userExist.save();
  } catch (e) {
    next(e);
  }
});

app.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const blog = await Blog.findById(id);
    // console.log(blog, "blog fetched");
    if (!blog) {
      return response.status(401).json({ error: "blog not found" });
    }
    //! Check if the user trying to delete the blog is the creator of the blog

    if (blog.user.toString() !== request.user) {
      console.log("checking if");
      return response
        .status(403)
        .json({ error: "user dont match to the deletor" });
    }

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
