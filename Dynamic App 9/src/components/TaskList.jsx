import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onDeleteTask, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Start by adding one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => onDeleteTask(task.id)}
          onToggle={() => onToggleComplete(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
