import React, { useRef, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
// import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "description" },
    { id: 2, title: "JavaScript2", body: "description2" },
    { id: 3, title: "JavaScript3", body: "description3" },
  ]);
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  // заменим на объект

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <div className="App">
      {/* передаем фунц-ю , хтобы получить новое значение */}
      <PostForm create={createPost} />
      {/* передаем фунц-ю remove */}
      {/* + условная отрисовка */}

      {posts.length !== 0 ? <PostList posts={posts} remove={removePost} title="Список постов" /> : <h1 style={{ textAlign: "center" }}>Empty</h1>}
    </div>
  );
}

/* Управляемый компонент
const [title, setTitle] = useState("");

<MyInput
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
*/

/*  неуправляемый /неконтролируемый компонент
воспользуемся хуком useRef().с помощью этого хука мы
можем получить доступ к DOM-элементу и  уже у этого дом элемента забрать  value
const bodyInputRef = useRef();
<MyInput ref={bodyInputRef} />

bodyInputRef.current - DOM-элемент
*/

/*
 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
- поскольку мы пытаемся передать reference собственно ручно созданный компонент и react не знает куда эту ссылку именно необходимо передать.
обернем комп в ф-цию React.forwardRef

const MyInput =
React.forwardRef(
     (props, ref) => { return <input className={classes.myInput} {... props} />;   }
);
*/
export default App;
