import { getFunction } from "../services/APIService";

function App() {
  function btnGetFunctionClick() {
      getFunction()
          .then(data => console.log(data))
          .catch(err => console.error(err));
  }

  function btnPostFunctionClick() {
    getFunction()
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
    </>
  );
}

export default App;



