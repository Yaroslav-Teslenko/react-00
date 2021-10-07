import React from "react";
import "./App.css";
import PostItem from "./components/PostItem";
function App() {
  return (
    <div className="App">
      <PostItem post={{ id: 1, title: "JavaScript", body: "description" }} />
    </div>
  );
}
/* передача данных */
/*
<PostItem value={"test"} item={{ title: 0 }}
>>const PostItem = (props) => {...}
    {value: 'test', item: {…}, number: 42}
      item: {title: 0}
      number: 42
      value: "test"
    [[Prototype]]: Object

    {props.number }
    {props.item.title}

*/

/* добавление стилей */
/*
- className вместо class
*/
export default App;
