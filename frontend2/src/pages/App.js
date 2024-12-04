import { getFunction, postFunction, deleteFunction, putFunction } from "../services/APIService";

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
      <div>
          <button onClick={btnGetFunctionClick}>GET Function</button>
      </div>
      <div>
          <button onClick={btnPostFunctionClick}>Post Function</button>
      </div>
      <div>
          <button onClick={btnDeleteFunctionClick}>Delete Function</button>
      </div>
      <div>
          <button onClick={btnPutFunctionClick}>Put Function</button>
      </div>
      
    </>
  );
}

export default App;



