import React from "react";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import { Route, Switch, Redirect } from "react-router-dom";
const AppRouter = () => {
  return (
    /* switch позволяет группировать маршруты и выбрать хотя бы один из тех который есть внутри.
      если не один из маршрутов не отработал мы можем сделать какой-то общий случай,
      например выводить страницу с ошибкой или же переводить на другую страницу
        <Redirect to="/error" />
      чтобы переводить на этот маршрут нам необходимо его объявить  <Route path="/error">*/
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
      <Route path="/error">
        <Error />
      </Route>
      <Redirect to="/error" />
    </Switch>
  );
};
export default AppRouter;
