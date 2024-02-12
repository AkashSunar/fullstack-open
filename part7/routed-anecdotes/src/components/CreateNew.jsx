// import { useState } from "react";
import { useField } from "../hooks";
const CreateNew = ({ addNew }) => {
  //   const [content, setContent] = useState("");
  //   const [author, setAuthor] = useState("");
  //     const [info, setInfo] = useState("");
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");
  // console.log(content)

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };
  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            // name="content"
            // value={content}
            // onChange={(e) => setContent(e.target.value)}
            name={content.name}
            value={content.value}
            onChange={content.onChange}

            // {...content}
          />
        </div>
        <div>
          author
          <input
            // name="author"
            // value={author}
            // onChange={(e) => setAuthor(e.target.value)}
            name={author.name}
            value={author.value}
            onChange={author.onChange}
            // {...author}
          />
        </div>
        <div>
          url for more info
          <input
            // name="info"
            // value={info}
            // onChange={(e) => setInfo(e.target.value)}
            name={info.name}
            value={info.value}
            onChange={info.onChange}
            // {...info}
          />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};
export default CreateNew;
