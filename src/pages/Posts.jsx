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

export default Posts;
