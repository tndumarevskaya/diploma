import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Message from './Message';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../styles/DialogComponent.css';

export default function DialogComponent({ onSearch }) {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleBack = () => {
    if (location.pathname.startsWith("/shelter/volunteer")) {
      navigate('/shelter/volunteer/chat');
    }
    if (location.pathname.startsWith("/shelter/adopter")) {
      navigate(`/shelter/adopter/chat`);
    }
    
  };
  
  return (
    <div className='dialog-component'>
      <div className='dialog-header'>
        <button className='second-button' onClick={handleBack}><ArrowBackIcon/>Назад</button>
        <div className='user-name'>Татьяна Думаревская</div>
      </div>
      <div className='message-container'>
        <div className='message-scroll'>
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
      </div>
      <div className='enter-message'>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Шарик"
          />
        <button type="submit">
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}