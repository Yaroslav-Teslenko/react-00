import React, { useState } from "react";
//react импортируем в каждый файл где мы создаем компонент
//
/*
react не понимает что в конкретном компоненте произошли какие-то изменения,
ему это необходимо явно сообщить .
для этого придумано состоянии(State). каждый компонент обладает каким-то состоянием и при изменении этого состояния react понимает что произошли изменения и перерисовывает компонент
 */
function App() {
  const [likes, setLikes] = useState(0);
  const [value, setValue] = useState("Text in input");

  function increment() {
    setLikes(likes + 1);
    //!!! мы не изменяем state  напрямую !!!
  }
  function decrement() {
    setLikes(likes - 1);
    //!!! мы не изменяем state  напрямую !!!
  }
  return (
    <div className="App">
      <h1>{likes}</h1>
      <h1>{value} </h1>
      <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
      <button onClick={increment}> Increment</button>
      <button onClick={decrement}> Decrement </button>
    </div>
  );
}
/* двустороннее связывание на примере input */
/*
   <input type="text" value={value}
   onChange={(event) => setValue(event.target.value)} />

   сразу достаем event.target.value и  изменяем state
*/
export default App;
