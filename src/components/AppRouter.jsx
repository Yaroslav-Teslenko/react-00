import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import { AuthContext } from "../context";
const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    /* switch позволяет группировать маршруты и выбрать хотя бы один из тех который есть внутри.
      если не один из маршрутов не отработал мы можем сделать какой-то общий случай,
      например выводить страницу с ошибкой или же переводить на другую страницу
        <Redirect to="/error" />
      чтобы переводить на этот маршрут нам необходимо его объявить  <Route path="/error">*/
    isAuth ? (
      <Switch>
        {privateRoutes.map((route) => (
          <Route component={route.component} path={route.path} exact={route.exact} key={route.path} />
        ))}
        <Redirect to="/posts" />
      </Switch>
    ) : (
      <Switch>
        {publicRoutes.map((route) => (
          <Route component={route.component} path={route.path} exact={route.exact} key={route.path} />
        ))}
        <Redirect to="/login" />
      </Switch>
    )
  );
};
export default AppRouter;
