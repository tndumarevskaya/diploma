import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Header({ isAuthenticated = true }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <div className='header'>
      <div className='logo'><img src={logo} alt='logo'/></div>
      {!isAuthenticated ?
        <button className='menu'>Меню</button>
        :
        <button className='menu' onClick={handleClick}>Выход</button>
      }
    </div>
  );
}