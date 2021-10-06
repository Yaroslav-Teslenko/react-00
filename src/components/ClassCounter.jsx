import React from "react";
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}> Increment</button>
        <button onClick={this.decrement}> Decrement </button>
      </div>
    );
  }
}

export default ClassCounter;

/*



ClassCounter.jsx
- явно указываем через расширение, что внутри файла будет использоваться JSX
- компонент наследует (extends) React.Component
- необходимо реализовать функцию render(), которая будет возвращать
JSX (в отличие от функционального компонента, который сразу этот JSX
возвращает без всяких промежуточных функций)


const ClassCounter
- называем как файл
- с заглавной
- extends React.Component
- render(){return(<JSX>)}
- !!! обязательно export default Counter;


- мы работаем внутри класса
    - от  function можно избавиться
    - чтобы обратиться к свойствам, методам используем this
- this.state  зарезервированоe свойствo для инициализации состояния
- this.setState  зарезервированый метод для изменения состояния


TypeError: Cannot read properties of undefined (reading 'setState')
потерян контекст, напрямую биндим в constructor
 this.increment = this.increment.bind(this);

*/
