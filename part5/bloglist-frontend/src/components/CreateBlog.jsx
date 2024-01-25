import React, { useState } from "react";
import blogServices from "../services/blogs";
import Notification from "./Notification";

const CreateBlog = ({ setStatusCode, statusCode }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const myBlog = await blogServices.createBlog(newBlog);
    console.log(myBlog.data);
    setStatusCode(myBlog.status);

    setNotification(`a new blog ${newBlog.title} added by ${newBlog.author}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      {notification ? (
        <Notification notification={notification} statusCode={statusCode} />
      ) : null}
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">title</label>{" "}
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleChange}
        />
        <label htmlFor="">author</label>
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleChange}
        />
        <label htmlFor="">url</label>
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleChange}
        />
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
