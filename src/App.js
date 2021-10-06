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
  console.log(likes);
  console.log(setLikes);
  function increment() {
    setLikes(likes + 1);
  }
  function decrement() {
    setLikes(likes - 1);
  }
  return (
    <div className="App">
      <h1>{likes}</h1>
      <button onClick={increment}> Increment</button>
      <button onClick={decrement}> Decrement </button>
    </div>
  );
}
/*

const state = useState();
console.log(state);

внутри -  это массив состоящий из двух элементов
первый элемент это само значение которое мы объявили
второй элемент функция, предназначеная для того чтобы изменять

поскольку мы знаем что estate возвращает массив из двух объектов
мы можем сделать деструктуризацию и сразу получить само состояние и функцию

и сразу инициализируем , н-р 5
const [state, setState ]= useState(5);
*/
export default App;
