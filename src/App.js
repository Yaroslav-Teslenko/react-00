import React, { useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "description" },
    { id: 2, title: "JavaScript2", body: "description2" },
    { id: 3, title: "JavaScript3", body: "description3" },
  ]);
  return (
    <div className="App">
      <form action="">
        <MyInput type="text" placeholder="Название поста" />
        <MyInput type="text" placeholder="Описание поста" />
        <MyButton disabled>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title={"Список постов"} />
    </div>
  );
}

/* forma */
/*

*/

/* добавление стилей */
/*
в инспекторе увидим MyButton как
<button class="MyButton_myBtn__1rqi-"></button>
название класса генерируется в соответствии с с модулем который мы сделали. т.о. мы можем добиться
изоляции стилей не используя н-р, БЭМ
*/
export default App;
