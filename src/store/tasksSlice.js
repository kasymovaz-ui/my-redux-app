// src/store/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  try {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  tasks: loadTasksFromStorage(),
  filter: 'all', // all | active | completed
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(), // простой уникальный ID
        text: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;