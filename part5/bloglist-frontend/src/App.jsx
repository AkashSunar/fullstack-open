import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
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
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      loginService.setToken(user.token);
    }
  }, []);

  const handleChange = (name) => (event) => {
    setCredentials({ ...credentials, [name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(credentials, "from usestate");
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      // console.log(window.localStorage.getItem("loggedBlogappUser"));
      // console.log(user,"checking user");
      setUser(user);
      // loginService.setToken(user.token);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const loginForm = () => {
    return (
      <>
        {" "}
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
    return (
      <>
        <h2>blogs</h2>
        <p>{`${user.name} logged in`}</p>
        <button onClick={handleLogout}>log out</button>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };
  return <div>{user === null ? loginForm() : blog()}</div>;
};

export default App;
