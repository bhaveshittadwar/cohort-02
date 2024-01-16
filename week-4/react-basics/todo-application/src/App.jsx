import './App.css'
import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTodo = () => {
    if(title.trim() !== '') {
      const newTodo = {
        title,
        description
      }

      console.log(title, description)

      setTodos([...todos, newTodo]);
      setTitle('');
      setDescription('');
    } else {
      alert('please enter a title')
    }
  }

  return (
    <div>
      <input type="text" name="title" id="title" value={title} placeholder='title' onChange={(e) => setTitle(e.target.value)} /><br />
      <input type="text" name="description" value={description} id="description" placeholder='description' onChange={(e) => setDescription(e.target.value)} /><br />
      <button onClick={addTodo}>Add Todo</button>

      <div>
        <ol>
          { todos.map((todo, index) => (
            <li key={index}>
              {todo.title} : {todo.description}
            </li>
          )) }
        </ol>
      </div>
    </div>
  )
}

export default App
