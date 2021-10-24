import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    /* чтобы реализовать роутинг нам необходимо все приложение обернуть в компонент BrowserRouter.
    именно он будет отслеживать изменение пути и перерисовывать компоненты */
    /* с помощью контекста мы можем создать некоторое глобальное хранилище и из любого
    компонента к этому глобальному хранилищу обращаться, при этом избегая передаче от родителя к ребенку .
     таких контекстov может быть  много и чтобы им воспользоваться, нам необходимо этот контекст
    импортировать, и использовать как компонент. но не сам контекст, а провайдер, который внутри него находится
     в него засунуть все содержимое нашего приложения.

     указать какие данные в этом контексте будут находиться, используется value
     создаем состоянием isAuth, функция которая будет его изменять и передаем в контекст

     теперь в компонентах можем к нему через контехт обрзшатся и менять его
     Login
        const { isAuth,  setIsAuth } = useContext(AuthContext);
        ...
            setIsAuth(true);
    */
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
export default App;
