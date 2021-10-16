import React from "react";
import MyButton from "./UI/button/MyButton";
const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.number} {props.post.title}
        </strong>
        <div className="post__body">{props.post.body}</div>
      </div>
      <div className="post__btns">
        {/* полученную remove  вызываем, передаем пост*/}
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
