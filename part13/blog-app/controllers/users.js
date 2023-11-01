const router = require("express").Router();

const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res,next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
       res.status(500).send({"error":[error.message]});
      next(error)
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res,next) => {
  const user = await User.findOne({ username: req.params.username });
  try {
    if (user) {
      user.username = req.body.username;
      await user.save();
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await User.destroy({ where: { id: id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send("error occured");
  }
});

module.exports = router;
