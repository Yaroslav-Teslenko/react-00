import React from "react";
import PostItem from "./PostItem";
const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {/* снова передаем фунц-ю remove */}
      {posts.map((post, index) => (
        <PostItem remove={remove} post={post} number={index + 1} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;

/*
const PostList = ({posts}) =>
пропсы это объект, т.о.  сразу можем сделать деструктуризацию, и вытащить нужно для нас поле

 */
