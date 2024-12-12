import React from "react";
import { getFunction, postFunction, deleteFunction, putFunction } from "../services/APIService";
import TaskList from "../pages/TaskList"; 
import Login from '../pages/Login'; // Acesso direto ao componente Login
import Registro from '../pages/Registro'; // Acesso direto ao componente Registro

function App() {
  // Função que lida com o botão de GET, chama o serviço getFunction e exibe o resultado no console
  function btnGetFunctionClick() {
      getFunction()
          .then(data => console.log(data))
          .catch(err => console.error(err)); // Exibe erro no console caso a requisição falhe
  }

  // Função que lida com o botão de POST, chama o serviço postFunction e exibe o resultado no console
  function btnPostFunctionClick() {
    postFunction()
        .then(data => console.log(data))
        .catch(err => console.error(err)); // Exibe erro no console caso a requisição falhe
  }

  // Função que lida com o botão de DELETE, chama o serviço deleteFunction e exibe o resultado no console
  function btnDeleteFunctionClick() {
    deleteFunction()
        .then(data => console.log(data))
        .catch(err => console.error(err)); // Exibe erro no console caso a requisição falhe
  }

  // Função que lida com o botão de PUT, chama o serviço putFunction e exibe o resultado no console
  function btnPutFunctionClick() {
    putFunction()
        .then(data => console.log(data))
        .catch(err => console.error(err)); // Exibe erro no console caso a requisição falhe
  }

  return (
    <>
      {/* Adicionando o componente TaskList */}
      <TaskList />  {/* Aqui o TaskList será exibido */}
    </>
  );
}

export default App;
