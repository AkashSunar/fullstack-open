import { useState } from "react";
import "./blog.css";
const Blog = ({ blog }) => {
  const [viewVisible, setViewVisible] = useState(false);
  const hiddeneWhenVisible = { display: viewVisible ? "none" : "" };
  return (
    <div>
      <h3>
        <div className="blogTitle">
          {blog.title}{" "}
          <button onClick={() => setViewVisible(!viewVisible)}>
            {viewVisible === true ? "view" : "hide"}
          </button>
          <div className="blogBody" style={hiddeneWhenVisible}>
            <a href="">{blog.url}</a>
            <br />
            likes {blog.likes} <button>like</button>
            <br />
            {blog.author}
          </div>
        </div>
      </h3>
    </div>
  );
};

export default Blog;
