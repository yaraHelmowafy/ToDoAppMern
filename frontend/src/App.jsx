import { useEffect, useState } from 'react';
import './app.css';
import ToDo from "./components/ToDo";
import { getAllToDo, addToDo, updateToDo, deleteToDo } from './utlis/HandleApi' 

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <h1>TODO APP</h1>
          <div className="top">
            <input 
              type="text"
              placeholder="Add Todos..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div 
              className="add" 
              onClick={isUpdating
                ? () => updateToDo(toDoId, text, setToDo, setText, setUpdating)
                : () => addToDo(text, setText, setToDo)
              }>
              {isUpdating ? "Update" : "Add"}
            </div>
          </div>
          <div className="list">
            {toDo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, setToDo)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
