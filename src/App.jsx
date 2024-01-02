import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = value;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, value]);
    }

    setValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setValue(todos[index]);
  };

  return (
    <div className="App">
      <h2>React Todo</h2>
      <div className="inputDiv">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="btnsDiv">
        <button onClick={addTodo}>{editIndex !== null ? 'Edit Todo' : 'Add Item'}</button>
        <button onClick={() => setTodos([])}>Delete All</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <div className="editDelBtns">
              <button className="editBtn" onClick={() => editTodo(index)}>
                Edit
              </button>
              <button className="deleteBtn" onClick={() => deleteTodo(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
