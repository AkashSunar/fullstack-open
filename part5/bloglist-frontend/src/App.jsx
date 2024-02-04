import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  // const [createVisible, setCreateVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userFromLocalStorage = JSON.parse(loggedUserJSON);
      // console.log(user, "checking user mm");
      setUser(userFromLocalStorage.data);
      blogService.setToken(userFromLocalStorage.data.token);
      // console.log(myToken,'checking from blogServices')
      // loginService.setToken(user.token);
    }
  }, []);

  const handleChange = (name) => (event) => {
    setCredentials({ ...credentials, [name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);
      setStatusCode(user.status);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user.data);
      setNotification(`${user.data.username} logged in`);
      setTimeout(() => {
        setNotification(null);
      }, 4000);
      // loginService.setToken(user.token);
    } catch (error) {
      setNotification(error.response.data.error);
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const loginForm = () => {
    return (
      <>
        {" "}
        {notification ? (
          <Notification notification={notification} statusCode={statusCode} />
        ) : null}
        <h2>log in to application</h2>
        <form action="">
          <div className="usermane">
            <label htmlFor="">username</label>
            <input
              type="text"
              name="useraname"
              onChange={handleChange("username")}
            />
          </div>
          <div className="password">
            <label htmlFor="">password</label>{" "}
            <input
              type="password"
              name="password"
              autoComplete="on"
              onChange={handleChange("password")}
            />
          </div>
          <button onClick={handleLogin}>login</button>
        </form>
      </>
    );
  };
  const blog = () => {
    // console.log(user,"from component blog")
    return (
      <>
        <h2>blogs</h2>
        {`${user.name} logged in`}
        <button onClick={handleLogout}>log out</button>
        <CreateBlog
          setStatusCode={setStatusCode}
          statusCode={statusCode}
          user={user}
        />
        {blogs
          .sort((b, a) => a.likes - b.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
      </>
    );
  };
  return <div>{user === null ? loginForm() : blog()}</div>;
};

export default App;
