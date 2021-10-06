import React, { useState } from "react";
const Counter = () => {
  const [count, setCount] = useState(0);
  function increment() {
    setCount(count + 1);
    //!!! мы не изменяем state  напрямую !!!
  }
  function decrement() {
    setCount(count - 1);
    //!!! мы не изменяем state  напрямую !!!
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}> Increment</button>
      <button onClick={decrement}> Decrement </button>
    </div>
  );
};

export default Counter;
/*
Counter.jsx
- явно указываем через расширение, что внутри файла будет использоваться JSX
- компонент это просто функция которая возвращает какой-то JSX

const Counter
- называем как файл
- с заглавной
- !!! обязательно export default Counter;
- !!! return(<JSX>)

const Counter =()=>{}
const Counter = function(){}

*/
