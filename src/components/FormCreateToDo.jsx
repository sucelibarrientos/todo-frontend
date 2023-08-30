import { useState } from "react";
import axios from "axios";

function FormCreateToDo({getToDos}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const handleTitle = (e) => {
    setTitle(e.target.value);
    setError("");
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setError("");
  };
  const handleSubmit = async (e) => {
    try {
        console.log("title", title);
        console.log("description", description);
        e.preventDefault();
        const result = await axios({
          method: "post",
          url: "https://todo-api-h8ov.onrender.com/api",
          data: {
            title,
            description,
          },
        });
        if (result.status === 200) {
          setTitle("");
          setDescription("");
          getToDos();
          console.log("To-do created successfully");
          console.log(result.data.toDo);
        }
    } catch (error) {
        setError(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleTitle}
        value={title}
        placeholder="title"
      />
      <input
        type="text"
        onChange={handleDescription}
        value={description}
        placeholder="description"
      />
      {error && <p>{error}</p>}
      <button type="submit">Create ToDo</button>
    </form>
  );
}

export default FormCreateToDo;
