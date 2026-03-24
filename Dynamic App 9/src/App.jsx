import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('dynamic-app-tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('dynamic-app-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app-container">
      <div className="blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="app-content">
        <header className="app-header">
          <h1>Dynamic Tasks</h1>
          <div className="task-stats">
            <span className="stat-badge">
              {tasks.length} total
            </span>
            <span className="stat-badge success">
              {completedCount} done
            </span>
          </div>
        </header>

        <TaskInput onAddTask={addTask} />
        
        <TaskList 
          tasks={tasks} 
          onDeleteTask={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
