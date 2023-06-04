import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "../styles/Message.css"
import volunteerAPI from '../http/volunteerAPI';
import adopterAPI from '../http/adopterAPI';
import pic from '../assets/user.jpg';

export default function Message({ chat, text, time}) {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleClick = () => {
    if (location.pathname.startsWith(`/shelter/${id}/volunteer`)) {
      localStorage.setItem("chat", JSON.stringify(chat));
      localStorage.setItem("user_chat", JSON.stringify(user));
      navigate(`/shelter/${id}/volunteer/chat/${chat.chat_id}`);
    }
    if (location.pathname.startsWith(`/shelter/${id}/adopter`)) {
      navigate(`/shelter/${id}/adopter/chat/${chat.chat_id}`);
    }
  }

  const getUser = async() => {
    if (chat.userTwo.userTypeId === 2) {
      setUser(await volunteerAPI.getVolunteerInfo(chat.userTwo.id));
      console.log(user);
    } if (chat.userTwo.userTypeId === 3) {
      setUser(await adopterAPI.getAdopterInfo(chat.userTwo.id));
      console.log(user);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  console.log(chat);
  return (
    <div className='message' onClick={handleClick}>
      <img src={user?.image || pic}/>
      <div className='text-block'>
        <div className='user-name'>
          <h3>{user?.firstName} {user?.lastName}</h3>
        </div>
        <div className='text-message'>
          <p>{text}</p>
        </div>
      </div>
      <div className='info-block'>
        <div className='data-time'>{time}</div>
        <div className='is-read'>1</div>
      </div>
    </div>
  )
}