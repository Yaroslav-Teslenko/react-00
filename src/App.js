import React, { useMemo, useRef, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
// import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "1 aa", body: "eeee" },
    { id: 2, title: "2 bb 3", body: "ff" },
    { id: 3, title: "3 Ccc", body: "dd" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedSort, setSelectedSort] = useState("");
  /* помним, что состоянии напрямую изменять нельзя развернем посты в новый массив и отсортируем уже его*/

  /*
 function getSortedPosts() {
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }
  функция каждый раз вызывается и каждый раз мы сортируем массив.
  функция вызывается на каждую перерисовку, на каждый render компонента.
  такое поведение нас не устраивает , это нерационально.
  Поэтому исюользуем    useMemo(callback, depts)
*/

  const sortedPosts = useMemo(() => {
    //console.log("sortedPosts");
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;

    /* теперь в константе sortedPosts у нас лежит еще один массив отсортированый,  и при этом массив пост никак не изменяется. на  основании этого отсортированного массива мы можем делать поиск */
  }, [selectedSort, posts]);

  const sortrdAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLowerCase().includes(searchQuery));
  }, [searchQuery, sortedPosts]);

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
        <MyInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="find"></MyInput>
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
      {/*sortrdAndSearchedPosts - передаем  отфильтрованый и отсортированный массив  */}
      {sortrdAndSearchedPosts.length !== 0 ? <PostList posts={sortrdAndSearchedPosts} remove={removePost} title="Список постов" /> : <h1 style={{ textAlign: "center" }}>Empty</h1>}
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
