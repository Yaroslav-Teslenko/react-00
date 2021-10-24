import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Error from "./pages/Error";
import Navbar from "./components/UI/Navbar/Navbar";
function App() {
  return (
    /* чтобы реализовать роутинг нам необходимо все приложение обернуть в компонент BrowserRouter.
    именно он будет отслеживать изменение пути и перерисовывать компоненты */
    <BrowserRouter>
      <Navbar />
      {/* switch позволяет группировать маршруты и выбрать хотя бы один из тех который есть внутри.
      если не один из маршрутов не отработал мы можем сделать какой-то общий случай,
      например выводить страницу с ошибкой или же переводить на другую страницу
        <Redirect to="/error" />
      чтобы переводить на этот маршрут нам необходимо его объявить  <Route path="/error">*/}
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
    </BrowserRouter>
  );
}
export default App;
