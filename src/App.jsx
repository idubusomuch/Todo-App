import { useState } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: '밥 먹기', completed: true },
    { id: 1, content: '코딩 공부하기', completed: true },
    { id: 2, content: '잠 자기', completed: false },
  ]);

  return (
    <div className="container">
      <Header />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function Header() {
  // 현재 시간 출력
  const today = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    return `${year}년 ${month}월 ${date}일`;
  };

  const [time] = useState(today());

  return (
    <header>
      <h1>TodoList</h1>
      <div className="profile">
        <span>{time}</span>
        <span>김하연</span>
      </div>
    </header>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState('');

  const insertTodo = () => {
    if (!inputValue.trim()) {
      alert('글자를 입력해주세요.');
      return;
    }
    const newTodo = { id: Number(new Date()), content: inputValue };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setInputValue('');
  };

  return (
    <div className="todo-insert">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="insert-btn" onClick={insertTodo}>
        추가
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todoList">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState(todo.content);
  // 수정 상태 여부
  const [isEditing, setIsEditing] = useState(false);
  // 완료 상태 여부
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  // 수정버튼을 눌렀을 때
  const editHandler = () => {
    setIsEditing(true);
    setInputValue(todo.content);
  };

  // 수정 기능
  const updateTodo = () => {
    if (!inputValue.trim()) {
      alert('글자를 입력해주세요.');
      return;
    }
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el,
      ),
    );
    // 수정 끝
    setIsEditing(false);
  };
  // 삭제 기능
  const deleteTodo = () => {
    setTodoList((prev) => {
      return prev.filter((el) => el.id !== todo.id);
    });
  };

  // 완료 시 체크 기능
  const completedTodo = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <li>
      <input type="checkbox" checked={isCompleted} onChange={completedTodo} />
      {isEditing ? ( // 수정하는 경우
        <>
          <input
            className="todo-update"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={updateTodo}>저장</button>
        </>
      ) : (
        // 수정이 아닌 경우
        <>
          <span className={isCompleted ? 'completed' : ''}>{todo.content}</span>
          <button className="update-btn" onClick={editHandler}>
            수정
          </button>
        </>
      )}
      <button className="delete-btn" onClick={deleteTodo}>
        삭제
      </button>
    </li>
  );
}

export default App;
