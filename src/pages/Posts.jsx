import React, { useEffect, useMemo, useRef, useState } from "react";

import PostList from "../components/PostList";
// import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import PostForm from "../components/PostForm";
import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import Loader from "../components/UI/Loader/Loader";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);

  const sortrdAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const responce = await PostService.getAll(limit, page);
    //setPosts(responce.data);
    setPosts([...posts, ...responce.data]);
    const totalCount = responce.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
    //console.log(responce.headers["x-total-count"]);
  });

  let pageArray = getPagesArray(totalPages);
  const lastElement = useRef();

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const changePage = (page) => {
    setPage(page);
    // fetchPosts(limit, page);
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
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Показать все" },
        ]}
      />
      {postError && <h1>Произошла ошибка {postError} </h1>}

      <PostList posts={sortrdAndSearchedPosts} remove={removePost} title="Список постов" />
      <div ref={lastElement} style={{ height: 20, backgroundColor: "orange" }}></div>
      {isPostLoading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
/*
https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API
  const observer = useRef();
для того чтобы у нас был доступ k этому  observer внутри компонента,создадим еще один reference. On нужен не только для получения доступа к дом элементу, также в него можно сохранять какие-то данные чтобы не терять их от рендера к рендыру.
  новый interceptionObserver мы помещаем в поле current этого reference. теперь нам необходимо указать за каким элементом мы будем наблюдать.
   для этого вызываем у  observer функцию  observe() и туда необходимо передать дом элемент. нашем случае это lastElement. таким образом этот div теперь у нас является наблюдаемым и каждый раз когда div появляются в зоне видимости будет отрабатывать  этот callback


useEffect(() => {
    if (isPostLoading) return;
    if (observer.current) observer.current.disconnect();
    /* если observer уже создан(в поле current что-то находится),
     то тогда мы должны отключить наблюдение со всеми элементами он за которыми наблюдает.
     после чего мы можем смело создавать новый, с замыканием на ноом номере страницы.
      сразу же необходимо сделать ограничением чтобы этот callback отрабатывал только тогда, когда номер текущей страницы меньше чем общее количество страниц

    let callback = function (entries, observer) {
       entries -массив элементов за которыми мы наблюдаем
      if (entries[0].isIntersecting && page < totalPages) {
         увеличм номер стрницы, когда наблюдаемый див виден.
        setPage(page + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [isPostLoading]);


*/
