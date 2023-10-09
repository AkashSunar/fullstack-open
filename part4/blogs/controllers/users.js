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

app.post("/", async (req, res,next) => {
  const body = req.body;
  if (!body.username || !body.password) {
    return res.status(400).json({
      error: "username or password is required",
    });
  }
  if (body.username.length <3 || body.password.length <3) {
    return res.status(400).json({
      error: "username and password must be greater than 3 character"
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const user = new User({
    username: body.username,
    passwordHash: passwordHash,
    name: body.name,
  });
  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
