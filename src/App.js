import React, { useRef, useState } from "react";
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
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  // заменим на объект
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();

    // const newPost = { id: Date.now(), title, body };
    // setPosts([...posts, newPost]);
    /* !!!опять же мы не изменяем состоянии напрямую мы вызываем функцию set, после передаем туда новый массив, куда разворачиваем старый массив с уже существующими постами и в конец добавляем новый пост. запомните это раз и навсегда это очень важная концепция */
    // setTitle("");
    // setBody("");
    //
    setPosts([...posts, { ...post, id: Date.now() }]);
    setPost({ title: "", body: "" });
  };
  return (
    <div className="App">
      <form action="">
        <MyInput type="text" placeholder="Название поста" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
        {/*  */}
        <MyInput type="text" placeholder="Описание поста" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} />

        {/*  */}
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title={"Список постов"} />
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
