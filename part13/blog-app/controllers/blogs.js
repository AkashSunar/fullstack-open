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
