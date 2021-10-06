import React from "react";
//react импортируем в каждый файл где мы создаем компонент
function App() {
  let likes = 0;
  return (
    <div className="App">
      <h1>{likes}</h1>
      <button onClick={() => (likes += 1)}> Increment</button>
      <button onClick={() => (likes -= 1)}> Decrement </button>
    </div>
  );
}
/*
{} для связывания в шаблоне

*/
export default App;
