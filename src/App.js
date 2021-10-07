import React, { useState } from "react";
import "./App.css";
import PostItem from "./components/PostItem";
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "description" },
    { id: 2, title: "JavaScript2", body: "description2" },
    { id: 3, title: "JavaScript3", body: "description3" },
  ]);
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Список постов</h1>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

/* вывод массивов данных */
/*
key={post.id}
- ключ должен хранить какое-то уникальное значение
- должен быть статичным
- !!!не использовать индекс элемента в массиве, (чтобы не вызать лишних перерисовок)
*/

/* добавление стилей */
/*
- inline-стили
 <h1 style={{ textAlign: "center" }}>

- className вместо class
*/
export default App;
