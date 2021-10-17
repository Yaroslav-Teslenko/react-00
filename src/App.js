import React, { useMemo, useRef, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./components/hooks/usePosts";
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "1 aa", body: "eeee" },
    { id: 2, title: "2 bb 3", body: "ff" },
    { id: 3, title: "3 Ccc", body: "dd" },
  ]);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState();
  const sortrdAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <div className="App">
      <MyButton style={{ margin: "15px" }} onClick={() => setModal(true)}>
        {" "}
        Создать пользователя
      </MyButton>
      <hr style={{ margin: "15px" }} />
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {/* передаем фунц-ю remove */}
      {/* + условная отрисовка */}
      {/*sortrdAndSearchedPosts - передаем  отфильтрованый и отсортированный массив  */}
      <PostList posts={sortrdAndSearchedPosts} remove={removePost} title="Список постов" />
    </div>
  );
}

/*
useMemo(callback, depts[])
производит вычисления, в данном случае сортирует массив
запоминает результат этих вычислений и кэширует
(подобное поведение называется мемоизация).
 на каждую перерисовку компонента она не пересчитывает заново, не сортирует
массив вновь. она достает отсортированный массив из кэша.
но каждый раз когда какая-то из зависимости (depts) изменилось,
например мы выбрали другой алгоритм сортировки, то функция вновь пересчитывает и кеширует результат выполнения до тех пор, пока опять одна из зависимости не изменится.
если массив зависимостей (depts) пустой, то функция отработает единожды, запомнит результат и больше не вызывается */

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
