import ToDo from "./ToDo";

function ToDoList({ toDos, getToDos }) {
  return (
    <div>
      <h2>ToDo List</h2>
      {toDos.map((toDo) => {
        return <ToDo key={toDo.id} toDo={toDo} getToDos={getToDos} />;
      })}
    </div>
  );
}

export default ToDoList;
