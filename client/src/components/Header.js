import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setSelectedOption(location.pathname.split('/')[1]);
  }, [location.pathname]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "") {
    } else if (selectedValue === "start") {
      navigate('/');
      setSelectedOption("");
    } else {
      navigate(`/${selectedValue}/login`);
      setSelectedOption(selectedValue);
    }
  };

  const handleClick = () => {
    dispatch(logout());
    navigate(`/`);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFavoriteClick = () => {
    navigate('/favorite');
  };

  const handleProfileClick = () => {
    navigate(`/adopter/${user.id}`);
  };

  return (
    <div className='header'>
      <div className='logo'>
        <img src={logo} alt='logo' onClick={handleLogoClick}/>
      </div>
      {!isLogin ? (
        <select className='menu' value={selectedOption} onChange={handleOptionChange} onClick={handleOptionChange}>
          <option value="">Меню</option>
          <option value="start">Главная</option>
          <option value="shelter">Приют</option>
          <option value="volunteer">Волонтер</option>
          <option value="adopter">Усыновитель</option>
        </select>
      ) : (
        <div className='icons'>
        {user.userTypeId === 3 && (
          <>
            <div className='user-icon' onClick={handleProfileClick}>
             <PersonIcon style={{ color: '#D36135', fontSize: 30 }} />
            </div>
            <div className='heart-icon' onClick={handleFavoriteClick}>
              <FavoriteIcon style={{ color: '#D36135', fontSize: 30 }} />
            </div>
          </>
        )}
        <button className='menu' onClick={handleClick}>
          Выход
        </button>
      </div>
      )}
    </div>
  );
}