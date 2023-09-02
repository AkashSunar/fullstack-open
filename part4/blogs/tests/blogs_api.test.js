const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "muna madan",
    author: "laxmi prasad devkota",
    url: "http://www.myblog.com",
    likes: 1000,
  },
  {
    title: "china harayeko manxe ",
    author: "Hari bansa acharya",
    url: "http://www.myblog.com",
    likes: 1000,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
   blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});
afterAll(async () => {
  await mongoose.connection.close();
});
