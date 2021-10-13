import React from "react";
import classes from "./MyInput.module.css";
const MyInput = (props) => {
  return <input className={classes.myInput} {...props} />;
};
/* const MyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} className={classes.myInput} {...props} />;
}); */
export default MyInput;

/*
в самом компоненте мы можем указать куда ref-ссылка  должна попадать .то есть, если у нас компоненте какая-то сложная структура, мы можем в какой-то конкретный блок в какой-то конкретный элемент эту ссылку передать
*/
