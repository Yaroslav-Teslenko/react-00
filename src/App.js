import React from "react";
import "./styles/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
function App() {
  return (
    /* чтобы реализовать роутинг нам необходимо все приложение обернуть в компонент BrowserRouter.
    именно он будет отслеживать изменение пути и перерисовывать компоненты */
    <BrowserRouter>
      <div className="navbar">
        <div className="navbar__links">
          {/* при нажатии на эти ссылки у нас происходит обновление страницы что уже нарушает
          принцип single page applications поскольку все переходы должны быть без перезагрузки  */}
          <a href="/about">O prog</a>
          <a href="/posts">Pages </a>
        </div>
      </div>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
    </BrowserRouter>
  );
}
export default App;
