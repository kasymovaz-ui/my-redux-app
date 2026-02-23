import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'Главная', path: '/' },
    { name: 'Мои задачи', path: '/tasks' },
    { name: 'Прогресс', path: '/progress' },
    { name: 'Цели', path: '/goals' },
    { name: 'Настройки', path: '/settings' },
  ];

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Логотип слева */}
          <a href="/" className="logo">
            Your's <span>Focus</span>
          </a>

          {/* Навигация справа */}
          <nav className="nav">
            {links.map((link) => (
              <a key={link.name} href={link.path} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>

          {/* Бургер справа на мобильных */}
          <div className={`burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        {links.map((link) => (
          <a key={link.name} href={link.path} onClick={() => setMenuOpen(false)}>
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}