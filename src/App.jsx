import { useSelector } from 'react-redux';
import Header from './components/Header';

function App() {
  const { message } = useSelector(state => state.data);
  // если у тебя уже есть tasks из Redux, можно использовать:
  // const { tasks } = useSelector(state => state.tasks);
  // пока оставим заглушку для примера
  const tasks = []; // заменить на реальные данные из Redux, когда подключишь

  return (
    <>
      <Header />

      <main style={{
        paddingTop: '100px',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 20px',
        minHeight: '100vh',
        background: '#7899da' // тёмный фон для концентрации
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#410083',
          fontSize: '3.5rem',
          marginBottom: '2rem'
        }}>
          {message || "Мои задачи на сегодня"}
        </h1>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            color: '#410083',
            fontSize: '2.2rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Текущий статус
          </h2>
          <div style={{ fontSize: '1.4rem', lineHeight: '2', color: '#e0e7ff', textAlign: 'center' }}>
            <p><strong>Активных задач:</strong> {tasks.filter ? tasks.filter(t => !t.completed).length : 0}</p>
            <p><strong>Всего задач:</strong> {tasks.length || 0}</p>
            <p style={{ marginTop: '1.5rem', fontStyle: 'italic' }}>
              Продолжай в том же духе! Ты на правильном пути 💪
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{
            color: '#410083',
            fontSize: '2.2rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Задачи на сегодня
          </h2>

          {tasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.3rem' }}>
              Пока задач нет... Добавь первую и начни день продуктивно! 🚀
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {tasks.map(task => (
                <li key={task.id} style={{
                  fontSize: '1.3rem',
                  padding: '16px',
                  margin: '12px 0',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '12px',
                  color: '#bfdbfe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <input type="checkbox" checked={task.completed} readOnly />
                  <span style={task.completed ? { textDecoration: 'line-through', opacity: 0.7 } : {}}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '60px',
          color: '#410083',
          fontSize: '1.1rem'
        }}>
          Управляй задачами эффективно с Redux Toolkit • 2026
        </p>
      </main>
    </>
  );
}

export default App;