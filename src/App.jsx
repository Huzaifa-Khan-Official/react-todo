import { useState } from 'react';
import './App.css';
import Swal from 'sweetalert2'

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (value !== "") {

      if (editIndex !== null) {
        const updateTodos = [...todos];
        updateTodos[editIndex] = value;
        setTodos(updateTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, value]);
      }

      setValue("");

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }


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
  }

  return (
    <div className="App">
      <h2>To do App</h2>
      <div className="inputDiv">
        <input
          className="form-control"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyPress}
        />
      </div>
      <div className="btnsDiv">
        <button onClick={addTodo} className='addBtn'>
          {editIndex !== null ? "Edit Todo" : "Add Todo"}
        </button>
        <button onClick={() => setTodos([])} style={{ display: todos.length > 0 ? "block" : "none" }} className='delAllBtn'>Delete All</button>
      </div>
      <div className="table-responsive">

        <table className='table table-bordered' style={{ display: todos.length > 0 ? "table" : "none" }}>
          <tbody>
            <tr>
              <th>S No.</th>
              <th>Todo Item</th>
              <th>Actions</th>
            </tr>
            {
              todos.map((todo, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className='todoTd'>{todo}</td>
                    <td><div className="editDelBtns">
                      <button className="editBtn"
                        onClick={() => editTodo(index)}
                      >
                        Edit
                      </button>
                      <button className="deleteBtn" onClick={() => deleteTodo(index)}>
                        Delete
                      </button>
                    </div></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
