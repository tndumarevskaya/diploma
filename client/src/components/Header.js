import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem('token');

  const handleClick = () => {
    dispatch(logout())
    navigate(`/`);
  };

  return (
    <div className='header'>
      <div className='logo'><img src={logo} alt='logo'/></div>
      {!isLogin ?
        <button className='menu' onClick={handleClick}>Меню</button>
        :
        <button className='menu' onClick={handleClick}>Выход</button>
      }
    </div>
  );
}