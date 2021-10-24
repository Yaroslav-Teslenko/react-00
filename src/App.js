import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import Loader from "./components/UI/Loader/Loader";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortrdAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  // const [isPostLoading, setPostLoading] = useState(false);

  /* реализуем постртаничность.
  сделаем запрос
  https://jsonplaceholder.typicode.com/posts?_limit=10&_page=2
  выберем их хедеров, короторые предоствлзет  jsonplaceholder
   x-total-count:   это общее количество постов, которое может вернуть сервер. больше у него их нет и на основании этой цифры мы можем посчитать общее количество страниц.
 */
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const responce = await PostService.getAll(limit, page);
    setPosts(responce.data);
    const totalCount = responce.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
    //console.log(responce.headers["x-total-count"]);
  });

  let pageArray = getPagesArray(totalPages);

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const changePage = (page) => {
    /* у такого подхода будут некоторые проблемы
    откроем вкладку network , оследим нажатия на пагинацию
    posts?_limit=5&_page=1 , posts?_limit=5&_page=2 и тд.
    и увидим отставание.
     дело в том , что fetchPosts внутри себя используют состоянии limit и page. порядок операций у нас такой - мы сначала это состояние изменяем,  потом вызываю функцию fetch .
     изменение состояния - это асинхронный процесс .
     для чего это нужно ? например у нас вызывается несколько функций которые изменяют состояние,  это вызывает к изменению каких-то дочерних компонентов. в этих компонентахпроисходят какие-то сайт эффекты и в целях оптимизации react не применяет изменения по одному. условно он накапливает некоторую пачку и применяет эти изменения разу/ом, чтобы избежать повторных манипуляций с DOM.  получается так что мы состоянии изменили, вызвали fetchPosts, но при этом там замкнуто состояние старое, page попадаeт в запрос с некоторым отставанием.

     это можно решить несколькими способами.
     например, в массив зависимостей useEffect() добавить page
     useEffect(() => { fetchPosts();}, [page]);
     a здесь вызов этой функции changePage убрать
     таким образом useEffect() будет следить за изменением странице и мы будем получать нужные данные .
     другой способ - limit, page передать в useFetching
      useFetching(async (limit, page) =>...
      useEffect(() => {fetchPosts(limit, page);}, []);
       export const useFetching = (callback) => {
         ...
               await callback(...args);
               ....

      важно понимать что изменение состояния это асинхронный процесс и некоторое поведение может отличаться от того которое вы ожидали поэтому важно уметь это отлаживать и находить
    */
    setPage(page);
    fetchPosts(limit, page);
  };
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
      {postError && <h1>Произошла ошибка {postError} </h1>}

      {isPostLoading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Loader />
        </div>
      ) : (
        <PostList posts={sortrdAndSearchedPosts} remove={removePost} title="Список постов" />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
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
