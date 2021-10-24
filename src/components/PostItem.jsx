import React from "react";
import { useHistory } from "react-router";
import MyButton from "./UI/button/MyButton";
const PostItem = (props) => {
  const router = useHistory();
  console.log(router);
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {/* {props.number} {props.post.title} */}
          {props.post.id} {props.post.title}
        </strong>
        <div className="post__body">{props.post.body}</div>
      </div>
      <div className="post__btns">
        {/* формируем динамически пути в зависимости от id */}
        <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>Открыть</MyButton>
        {/* полученную remove  вызываем, передаем пост*/}
        <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
/* Object

router =
action: "POP"
block: ƒ block(prompt)
createHref: ƒ createHref(location)
go: ƒ go(n)
goBack: ƒ goBack()
goForward: ƒ goForward()
length: 16
listen: ƒ listen(listener)
location: {pathname: '/posts', search: '', hash: '', state: undefined, key: 'vdoh6s'}
push: ƒ push(path, state)
replace: ƒ replace(path, state)
[[Prototype]]: Object

*/
