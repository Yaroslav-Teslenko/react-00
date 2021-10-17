import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem";
const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {/* снова передаем фунц-ю remove */}
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} post={post} number={index + 1} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;

/*
https://reactcommunity.org/react-transition-group/transition-group
1) index.js
в   <TransitionGroup > заворачиваем  posts.map(...)
в <CSSTransition
    key={id}
    timeout={500}
    classNames="item"
  >  заворачиваем   <PostItem(...)

key={post.id} , с <PostItem убираем
classNames= "post"
2) styles.css
копируем к себе стили .item-(...)
.item заменям на .post


 */
