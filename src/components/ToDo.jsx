import axios from "axios";
import { useState } from "react";
import FormEditToDo from "./FormEditToDo";

function ToDo({ toDo, getToDos }) {
  const [edit, setEdit] = useState(false);
  const handleDelete = async () => {
    try {
      const result = await axios({
        method: "delete",
        url: `https://todo-api-h8ov.onrender.com/api/${toDo.id}`,
      });
      if (result.status === 200) {
        getToDos();
        console.log("To-do deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateDone = async () => {
    try {
      const result = await axios({
        method: "patch",
        url: `https://todo-api-h8ov.onrender.com/api/${toDo.id}`,
        data: {
          isDone: !toDo.isDone,
        },
      });
      if (result.status === 200) {
        getToDos();
        console.log("To-do updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={toDo.isDone ? "marcado" : "desmarcado"}>
      {edit ? (
        <>
          <button
            onClick={() => {
              setEdit(false);
            }}
          >
            X
          </button>
          <FormEditToDo getToDos={getToDos} toDo={toDo} setEdit={setEdit} />
        </>
      ) : (
        <>
          <h4>{toDo.title}</h4>
          <p>{toDo.description}</p>
          <button onClick={handleUpdateDone}>
            {toDo.isDone ? "desmarcar" : "marcar"}
          </button>
          <button
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}
export default ToDo;
