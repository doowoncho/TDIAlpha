import React, { useState, useEffect, useRef } from 'react'
import '../Styles/todoitem.css';
import { createToDo, getAllTodo, deleteToDoById, updateToDoById, deleteAllToDo } from '../Components/APICalls';

export default function ToDoListPage() {
  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    try{
      const data = await getAllTodo();
      if (data == null) return;
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const addTask = async (e) => {
    e.preventDefault(); 
    const text = document.getElementById('text').value;
    const task = {
      text: text,
      completed: false
    };
    console.log(task);
    const newTask = await createToDo(task);
    setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the state
    document.getElementById('text').value = ''; // Clear the input field
  }

  const toggleCompleted = async (id, completed) => {
    try {
      const updatedTask = await updateToDoById(id, completed);
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: updatedTask.completed } : task));
    } catch (error) {
      console.error("Error toggling completed status:", error);
    }
  }

  const deleteTask = async (id) => {
    try {
      await deleteToDoById(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const deleteAll = async () => {
    try {
      await deleteAllToDo();
      setTasks([]); // Clear the tasks state
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
     <div className="container">
        <h1 className="my-4 text-center">To Do List</h1>
     </div>
     <div className="todo-list">
     <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input type="checkbox" checked={task.completed || false} onChange={(e) => toggleCompleted(task.id, e.target.value)} className='todocheckbox'/>
              <div className='todotext'>
              {task.text}
              </div>
              <button onClick={() => deleteTask(task.id)} className='todobutton delete'>Delete</button>
            </li>
          ))}
        </ul>
        <input id="text" className='todoinputtext'/>
        <button type="submit" onClick={addTask} className='todobutton'>Add</button>   
        <button type="button" onClick={deleteAll} className='todobutton'>Delete All</button>
      </div>     
    </>
  );
}
