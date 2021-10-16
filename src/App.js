import React, { useRef, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "4JavaScript", body: "description" },
    { id: 2, title: "2JavaScript2", body: "description2" },
    { id: 3, title: "1JavaScript3", body: "description3" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedSort, setSelectedSort] = useState("");
  /* помним, что состоянии напрямую изменять нельзя развернем посты в новый массив и отсортируем уже его*/

  function getSortedPosts() {
    if (selectedSort) {
      /* функция каждый раз вызывается и каждый раз мы сортируем массив.
        функция вызывается на каждую перерисовку, на каждый render компонента.
        такое поведение нас не устраивает , это нерационально */
      console.log("getSortedPosts");
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }
  const sortedPosts = getSortedPosts();
  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

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
      <hr style={{ margin: "15px" }} />
      <div>
        <MyInput vaue={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="find"></MyInput>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сoртировка"
          options={[
            { value: "title", name: "По названию" },
            { value: "body", name: "По содержанию" },
          ]}
        >
          {" "}
        </MySelect>
      </div>

      {/* передаем фунц-ю remove */}
      {/* + условная отрисовка */}

      {posts.length !== 0 ? <PostList posts={sortedPosts} remove={removePost} title="Список постов" /> : <h1 style={{ textAlign: "center" }}>Empty</h1>}
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
