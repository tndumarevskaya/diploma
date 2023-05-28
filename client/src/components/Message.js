import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/Message.css"

export default function Message({ chatId }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname.startsWith("/shelter/volunteer")) {
      navigate(`/shelter/volunteer/chat/${chatId}`);
    }
    if (location.pathname.startsWith("/shelter/adopter")) {
      navigate(`/shelter/adopter/chat/${chatId}`);
    }
  }

  console.log(typeof handleClick);

  return (
    <div className='message' onClick={handleClick}>
      <img />
      <div className='text-block'>
        <div className='user-name'>
          <h3>Татьяна Думаревская</h3>
        </div>
        <div className='text-message'>
          <p>Hello!</p>
        </div>
      </div>
      <div className='info-block'>
        <div className='data-time'>16:02</div>
        <div className='is-read'>1</div>
      </div>
    </div>
  )
}