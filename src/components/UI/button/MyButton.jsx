import React from "react";
import classes from "./MyButton.module.css";
const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
};
export default MyButton;
/*

 // <MyButton disabled>Создать пост</MyButton>
 <button {...props}
все пропсы которые мы будем передавать в компонент , можем сразу развернуть в кнопку

*/
/*
props.children;
по умолчанию react не знает, в какое место компонента необходимо добавлять вложенные элементы.  для этого предназначен props.children


const MyButton = (props) => {
  return <button className={classes.myBtn}>{props.children}</button>;
};
 */

/*
получаем стиль как свойства объекта
название класса генерируется в соответствии с css модулем. таким образом мы можем добиться изоляции стилей не используя бэм и тп
*/
