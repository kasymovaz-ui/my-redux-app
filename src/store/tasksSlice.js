import { createSlice, nanoid } from '@reduxjs/toolkit';

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
        id: nanoid(),
        text: action.payload,
        completed: false,
        likes: 0,
        isFavorite: false,
        ratings: [],           // массив оценок (например [5, 4, 3])
        createdAt: new Date().toISOString()
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // === Новые действия ===
    toggleLike: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.likes += 1;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    toggleFavorite: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.isFavorite = !task.isFavorite;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    addRating: (state, action) => {
      const { taskId, rating } = action.payload; // rating от 1 до 5
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.ratings.push(rating);
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  }
});

export const { 
  addTask, 
  toggleTask, 
  deleteTask, 
  setFilter,
  toggleLike,
  toggleFavorite,
  addRating 
} = tasksSlice.actions;

export default tasksSlice.reducer;