import ToDoList from "./components/ToDoList";
import FormCreateToDo from "./components/FormCreateToDo";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [toDos, setToDos] = useState([]);
  const getToDos = async () => {
    try {
      const result = await axios({
        method: "get",
        url: "https://todo-api-h8ov.onrender.com/api",
      });
      if (result.status === 200) {
        console.log(result.data.data);
        setToDos(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToDos();
  }, []);
  return (
    <div className="container">
      <div className="app">
        <div clssName="toDo">
        <h1>App ToDo</h1>
        <FormCreateToDo getToDos={getToDos} />
        <ToDoList toDos={toDos} getToDos={getToDos} />
        </div>
      </div>
    </div>
  );
}

export default App;
