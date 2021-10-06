import React from "react";
//импортируем ядро реактора
import ReactDOM from "react-dom";
// импортируем react дом для того чтобы монтировать наш компонент в приложении

import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));
/* первым параметром мы передаем компонент,который необходимо отрисовать
 вторым блок, в который мы этот компонент будем монтировать  */

/*
 ReactDOM.render( <div> Text </div> , document.getElementById("root"));
 мы можем здесь создать блок div и его что-нибудь поместить например какой то
текст эта структура может быть сколь угодно сложно и если сейчас мы откроем
приложение то увидим эту надпись


kаким образом мы пишем html-разметку внутри js файла?
такой синтаксис называется JSX, он является расширением java script и упрощает написание кода
ReactDOM.render(<div> <button>Text</button> </div>)
то же самое без него
ReactDOM.render(React.createElement('div',{}, React.createElement('button',{}, 'Кнопка')));
React.createElement('type', "props", "children")
*/

/*
ReactDOM.render(
  React.createElement("button",
  { onClick: () => console.log("Кнопка"), disabled: false }, "Кнопка"), document.getElementById("root"));
 */
