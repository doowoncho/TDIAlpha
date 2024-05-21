import React, { useState, useEffect } from 'react';
import { createToDo, getAllTodo, deleteToDoById, updateToDoById, deleteAllToDo } from '../Components/APICalls';
import { Button, Checkbox, IconButton, TextField, Input } from '@mui/material';
import { DeleteOutline, Edit, Check } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ToDoListPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  async function fetchData() {
    try {
      const data = await getAllTodo();
      if (data == null) return;
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
    const newTask = await createToDo(task);
    setTasks(prevTasks => [...prevTasks, newTask]);
    document.getElementById('text').value = '';
  }

  const toggleCompleted = async (id, currentCompleted) => {
    try {
      const updatedTask = await updateToDoById(id, {completed: !currentCompleted});
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
      setTasks([]);
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  }

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  }

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingText('');
  }

  const saveEditing = async (id) => {
    try {
      const updatedTask = await updateToDoById(id, { text: editingText });
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, text: updatedTask.text } : task));
      cancelEditing();
    } catch (error) {
      console.error("Error updating task:", error);
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
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 d-flex align-items-center">
            <TextField id="text" variant="outlined" className="flex-grow-1 me-2" />
            <Button type="submit" onClick={addTask} variant="contained" className="me-2">Add</Button>
            {/* <Button type="button" onClick={deleteAll} variant="contained" color="error">Delete All</Button> */}
          </div>
        </div>
        <ul className="list-group">
          {tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1">
                <Checkbox 
                  checked={task.completed || false} 
                  onChange={() => toggleCompleted(task.id, task.completed)} 
                />
                {editingTaskId === task.id ? (
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="ms-2 flex-grow-1"
                    fullWidth
                  />
                ) : (
                  <span className="ms-2 flex-grow-1">{task.text}</span>
                )}
              </div>
              <div className="d-flex">
                {editingTaskId === task.id ? (
                  <>
                    <IconButton onClick={() => saveEditing(task.id)} color="primary">
                      <Check />
                    </IconButton>
                    <IconButton onClick={cancelEditing} color="default">
                      <DeleteOutline />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => startEditing(task.id, task.text)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteTask(task.id)} color="error">
                      <DeleteOutline />
                    </IconButton>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
