require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const Blog = require("./models/blog");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(500).send("error occured");
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.destroy({ where: { id: id } });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send("error occured");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
