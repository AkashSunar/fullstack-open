import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const handleChange = (name) => (event) => {
    setCredentials({ ...credentials, [name]: event.target.value });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(credentials, "from usestate");
    try {
      const user = await loginService.login(credentials);
      console.log(user);
      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {user === null ? (
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
      ) : (
        <>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
