// src/App.jsx

import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.

const App = () => {
  // 새롭게 생성하는 todo를 관리하는 state
  const [todo, setTodo] = useState({
    title: "",
  });

  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos(data);
  };

  const onSubmitHandler = async (todo) => {
    //1.  이때 todos는 [{투두하나}]임
    await axios.post("http://localhost:3001/todos", todo); // 이때 서버에 있는 todos도 [{투두하나}]임

    // 근데 여기서 서버 요청이 끝나고 서버는 [{투두가},{두개임}]

    setTodos([...todos, todo]); //2. <-- 만약 이게 없다면, go to useEffect
    //4. 새로고침해서 진짜 현재 서버 데이터를 받아오기전에 상태를 똑같이 동기시켜줌
    //5. 어떻게보면 유저한테 서버에서 새로 받아온것처럼 속이는거지
  };

  const onClickDeleteButtonHandler =  (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`)
  }

  useEffect(() => {
    fetchTodos(); //3. 새로고침해서 여기를 다시 실행해줘야 서버값이 새로 들어옴 e.g) [{투두가},{두개임}]
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          // 👇 submit했을 때 브라우저의 새로고침을 방지합니다.
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>{todo.title}
          <button type ="button" onClick={()=> onClickDeleteButtonHandler(todo.id)}>삭제하기</button></div>
        ))}
      </div>
    </>
  );
};

export default App;
