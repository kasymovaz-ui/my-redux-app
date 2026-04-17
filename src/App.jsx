import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, deleteTask, setFilter, toggleLike, toggleFavorite, addRating } from './store/tasksSlice';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector(state => state.tasks);

  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    dispatch(addTask(newTaskText));
    setNewTaskText('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Функция для подсчёта средней оценки
  const getAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  };

  return (
    <>
      <Header />

      <main style={{
        paddingTop: '100px',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 20px',
        background: '#0f0f1a',
        color: 'white',
        minHeight: '100vh'
      }}>
        <h1 style={{ textAlign: 'center', color: '#a78bfa', fontSize: '3.5rem', marginBottom: '2rem' }}>
          Мои задачи
        </h1>

        {/* Форма добавления */}
        <form onSubmit={handleAddTask} style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ color: '#c084fc', marginBottom: '1.5rem', textAlign: 'center' }}>
            Добавить новую задачу
          </h2>

          <div style={{ display: 'flex', gap: '16px' }}>
            <input
              type="text"
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              placeholder="Что нужно сделать?"
              required
              style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #4a5568', background: '#1e293b', color: 'white' }}
            />
            <button type="submit" style={{
              padding: '14px 32px',
              background: 'linear-gradient(90deg, #a78bfa, #c084fc)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Добавить
            </button>
          </div>
        </form>

        {/* Фильтры */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => dispatch(setFilter(f))}
              style={{
                padding: '10px 24px',
                background: filter === f ? '#c084fc' : 'rgba(99, 102, 241, 0.2)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Завершённые'}
            </button>
          ))}
        </div>

        {/* Список задач с Like, Favorite, Rating */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          {filteredTasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.3rem' }}>
              Пока задач нет... Добавь первую! 🚀
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {filteredTasks.map(task => {
                const avgRating = getAverageRating(task.ratings);
                return (
                  <div key={task.id} style={{
                    background: 'rgba(59, 130, 246, 0.12)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => dispatch(toggleTask(task.id))}
                          style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                        />
                        <span style={{
                          fontSize: '1.2rem',
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? '#6b7280' : 'white'
                        }}>
                          {task.text}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => dispatch(toggleLike(task.id))} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>
                          ❤️ {task.likes || 0}
                        </button>
                        <button onClick={() => dispatch(toggleFavorite(task.id))} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer' }}>
                          {task.isFavorite ? '⭐' : '☆'}
                        </button>
                      </div>
                    </div>

                    {/* Добавление оценки */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {[1,2,3,4,5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => dispatch(addRating({ taskId: task.id, rating }))}
                          style={{
                            padding: '8px 12px',
                            background: '#1e293b',
                            border: '1px solid #4a5568',
                            borderRadius: '8px',
                            color: '#c084fc',
                            cursor: 'pointer'
                          }}
                        >
                          {rating}★
                        </button>
                      ))}
                    </div>

                    {task.ratings && task.ratings.length > 0 && (
                      <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '8px' }}>
                        Средняя оценка: <strong>{avgRating}</strong> ★
                      </p>
                    )}

                    <button
                      onClick={() => dispatch(deleteTask(task.id))}
                      style={{
                        background: '#ef4444',
                        border: 'none',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        alignSelf: 'flex-end'
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;