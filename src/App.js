import React, { useEffect, useMemo, useRef, useState } from "react";
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
import PostService from "./API/PostService";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortrdAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const responce = await PostService.getAll();
    setPosts(responce.data);
  }

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

/*жизненный цикл компонента
 каждый
- монтирование (mount)
это когда создается компонент и в монтируется в дом дерево
- обновления компонента (update)
например мы изменили состоянии, произошела перерисовка компонента. это стадия активной жизни компонента, когда он работает , когда мы его видим  - - размонтирование unmount
когда он больше не нужен, и его удаляем. например мы хотим его скрыть
или же мы переходим на другую страницу и за ненадобностью react его уничтожает


useEffect(callback, depts[]) - отслеживает стадии жизненного цикла

1) useEffect(()=>{ fetchPosts()}, [])
когда массив зависимости пустой,  callback отработает лишь единожды
когда компонент был вмонтирован, таким образом мы можем
отследить эту стадию монтирования и выполнить нужные для нас действия

2) useEffect( ()=>{fetchPosts()}, [filter])
для того чтобы следить за изменениями, необходимо добавить какие-то зависимости в массив


3) useEffect( ()=> {
  fetchPosts()
  return ()=>{ делаем очистку}
}, [filter])

если возвращает callback какую-то функцию,  то эта функция будет вызвана как раз в момент демонтирования компонента
*/

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
