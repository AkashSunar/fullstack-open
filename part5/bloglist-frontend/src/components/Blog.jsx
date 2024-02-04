import { useState } from "react";
import "./blog.css";
import blogServices from "../services/blogs";
const Blog = ({ blog,user }) => {
  const [viewVisible, setViewVisible] = useState(false);
  const [likes,setLikes]=useState(blog.likes)
  const hiddeneWhenVisible = { display: viewVisible ? "none" : "" };

  const handleLike = async (blog) => {
    blog.likes+=1
    setLikes({...blog,likes})
    const likeCheck = await blogServices.updateLike(blog);
    // console.log(blog.id, "checking blog")
   
  }
  const handleDelete = (id,user) => {
    window.confirm(`remove the blog?`)? blogServices.deleteBlog(id,user.token):null
    // window.confirm(`Remove the blog`)
  }
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
            likes {blog.likes} <button onClick={()=>handleLike(blog)}>like</button>
            <br />
            {blog.author}
          </div>
          <div className="delete-btn">
            <button onClick={()=>handleDelete(blog.id,user)} >Delete</button>
          </div>
        </div>
      </h3>
    </div>
  );
};

export default Blog;
