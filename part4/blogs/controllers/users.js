const app = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

app.get("/", async (request, response) => {
  try {
    const blogs = await User.find({});
    response.json(blogs);
  } catch (error) {
    // Handle errors here
    response.status(500).json({ error: "An error occurred" });
  }
});

app.post("/", async (req, res) => {
    const body = req.body;
    console.log(body)
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
        username: body.username,
        passwordHash: passwordHash,
        name:body.name
  });
  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
