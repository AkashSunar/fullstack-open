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
  const [createVisible, setCreateVisible] = useState(false);

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

  const hiddenWhenVisible = { display: createVisible ? "none" : "" };
  const showWhenVisible = { display: createVisible ? "" : "none" };

  return (
    <div>
      {notification ? (
        <Notification notification={notification} statusCode={statusCode} />
      ) : null}
      <div style={hiddenWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>create new note</button>
      </div>
      <div style={showWhenVisible}>
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
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

export default CreateBlog;
