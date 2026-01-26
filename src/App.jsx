// src/App.jsx
import { useSelector } from 'react-redux';

function App() {
  const { user, hobbies, message } = useSelector((state) => state.data);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>{message}</h1>
      
      <h2>Информация о пользователе:</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Возраст:</strong> {user.age}</p>
      <p><strong>Город:</strong> {user.city}</p>
      
      <h2>Мои хобби:</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      
      <p style={{ marginTop: '50px', color: '#666', fontStyle: 'italic' }}>
        Данные загружены из Redux Toolkit (без JSON-файла!)
      </p>
    </div>
  );
}

export default App;