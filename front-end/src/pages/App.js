import React from "react";
import { getFunction, postFunction, deleteFunction, putFunction } from "../services/APIService";
import TaskList from "../pages/TaskList";  // Importe seu componente TaskList

function App() {
  function btnGetFunctionClick() {
      getFunction()
          .then(data => console.log(data))
          .catch(err => console.error(err));
  }

  function btnPostFunctionClick() {
    postFunction()
        .then(data => console.log(data))
        .catch(err => console.error(err));
  }

  function btnDeleteFunctionClick() {
    deleteFunction()
        .then(data => console.log(data))
        .catch(err => console.error(err));
  }

  function btnPutFunctionClick() {
    putFunction()
        .then(data => console.log(data))
        .catch(err => console.error(err));
  }

  return (
    <>
      {/* Adicionando o componente TaskList */}
      <TaskList />  {/* Aqui o TaskList será exibido */}
    </>
  );
}

export default App;
