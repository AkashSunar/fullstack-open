const app = require("express").Router();
const {Blog} = require("../models/index");

app.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(500).send("error occured");
  }
});
app.put("/:id", async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id);
  try {
    if (blog) {
      blog.likes += 1;
      await blog.save();
      res.status(200).json({ likes: blog.likes })
    } else {
      throw new Error("NOT FOUND")
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.destroy({ where: { id: id } });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send("error occured");
  }
});
module.exports = app;
