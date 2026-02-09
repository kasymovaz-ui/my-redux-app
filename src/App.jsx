import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppData } from './store/appDataSlice';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch();
  const { data, status } = useSelector(state => state.appData);

  useEffect(() => {
    dispatch(fetchAppData());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f1a', color: 'white' }}>
        <h2>Загрузка данных... 🍰</h2>
      </div>
    );
  }

  if (status === 'failed' || !data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f1a', color: 'white' }}>
        <h2>Ошибка загрузки данных 😔</h2>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main style={{
        paddingTop: '100px',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 20px',
        background: '#0f0f1a',
        color: 'white'
      }}>
        {/* Блок 1 — приветствие */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            color: '#a78bfa',
            marginBottom: '1rem'
          }}>
            {data.welcome.title}
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#c084fc' }}>
            {data.welcome.subtitle}
          </p>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: '1rem' }}>
            {data.welcome.motivation}
          </p>
        </div>

        {/* Блок 2 — статистика */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ textAlign: 'center', color: '#c084fc', marginBottom: '2rem' }}>
            Текущий статус
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#a78bfa' }}>
                {data.stats.activeTasks}
              </div>
              <div style={{ color: '#94a3b8' }}>Активных задач</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#a78bfa' }}>
                {data.stats.completedToday}
              </div>
              <div style={{ color: '#94a3b8' }}>Завершено сегодня</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#a78bfa' }}>
                {data.stats.productivityScore}%
              </div>
              <div style={{ color: '#94a3b8' }}>Продуктивность</div>
            </div>
          </div>
        </div>

        {/* Блок 3 — List/Detail (список задач) */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ textAlign: 'center', color: '#c084fc', marginBottom: '2rem' }}>
            Задачи на сегодня
          </h2>

          {data.tasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.3rem' }}>
              Пока задач нет... Добавь первую! 🚀
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {data.tasks.map(task => (
                <div key={task.id} style={{
                  background: 'rgba(59, 130, 246, 0.12)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                  <h3 style={{ color: '#c084fc', marginBottom: '12px' }}>
                    {task.title}
                  </h3>
                  <p style={{ color: '#bfdbfe', marginBottom: '12px' }}>
                    {task.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#94a3b8' }}>
                    <span>Приоритет: <strong style={{ color: task.priority === 'high' ? '#f87171' : '#fbbf24' }}>
                      {task.priority}
                    </strong></span>
                    <span>Дедлайн: {task.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Блок 4 — цели */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '40px',
          marginTop: '40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ textAlign: 'center', color: '#c084fc', marginBottom: '2rem' }}>
            Твои цели
          </h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {data.goals.map(goal => (
              <div key={goal.id} style={{
                background: 'rgba(167, 139, 250, 0.12)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(167, 139, 250, 0.2)'
              }}>
                <h3 style={{ color: '#c084fc', marginBottom: '12px' }}>
                  {goal.title}
                </h3>
                <div style={{ marginBottom: '12px' }}>
                  Прогресс: <strong>{goal.progress}/{goal.total}</strong>
                </div>
                <p style={{ color: '#bfdbfe' }}>{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;