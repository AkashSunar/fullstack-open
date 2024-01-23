import React, { useState } from "react";
import loginService from "../services/login";
import Blog from "./Blog";

const LoginForm = () => {
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
      console.log("error occured");
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
       <><h2>welcome akash</h2></>
      )}
    </div>
  );
};

export default LoginForm;
