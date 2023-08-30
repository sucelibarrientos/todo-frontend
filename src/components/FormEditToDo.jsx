import { useState } from "react";
import axios from "axios";

function FormEditToDo({ getToDos, toDo, setEdit }) {
  const [title, setTitle] = useState(toDo.title);
  const [description, setDescription] = useState(toDo.description);
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
        method: "patch",
        url: `https://todo-api-h8ov.onrender.com/api/${toDo.id}`,
        data: {
          title,
          description,
        },
      });
      if (result.status === 200) {
        setTitle("");
        setDescription("");
        getToDos();
        console.log("To-do Edited successfully");
        console.log(result.data.toDo);
        setEdit(false);
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
      <button type="submit">Edit ToDo</button>
    </form>
  );
}

export default FormEditToDo;
