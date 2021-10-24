import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
function App() {
  return (
    /* чтобы реализовать роутинг нам необходимо все приложение обернуть в компонент BrowserRouter.
    именно он будет отслеживать изменение пути и перерисовывать компоненты */
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}
export default App;
