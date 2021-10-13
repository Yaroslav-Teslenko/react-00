import React from "react";
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
        <button>Удалить</button>
      </div>
    </div>
  );
};

export default PostItem;
