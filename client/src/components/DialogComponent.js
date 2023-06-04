import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Message from './Message';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../styles/DialogComponent.css';
import chatAPI from '../http/chatAPI';
import { getMessages, sendMessage } from '../sockets/chat-socket';


export default function DialogComponent({ onSearch }) {
  const { id, chat_id } = useParams();
  const location = useLocation();
  const [messageTerm, setMessageTerm] = useState('');
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const chat = JSON.parse(localStorage.getItem('chat'));
  const user = JSON.parse(localStorage.getItem('user_chat'));
  const messageContainerRef = useRef(null);

  useEffect(() => {
    getMessages(chat.chat_id, (response) => {
      setMessages(response);
    });
  }, [messages]);

  const handleSend = () => {
    if (messageTerm) {
      sendMessage({message_text: messageTerm, user_from: chat.user_one_id, chat_id: chat_id});
      setMessageTerm('');
    }
  };


  const handleBack = () => {
    if (location.pathname.startsWith(`/shelter/${id}/volunteer`)) {
      navigate(`/shelter/${id}/volunteer/chat`);
    }
    if (location.pathname.startsWith(`/shelter/${id}/adopter`)) {
      navigate(`/shelter/${id}/adopter/chat`);
    }
  };

  console.log(user);

  return (
    <div className="dialog-component">
      <div className="dialog-header">
        <button className="second-button" onClick={handleBack}>
          <ArrowBackIcon /> Назад
        </button>
        <div className="user-name">{user?.firstName} {user?.lastName}</div>
      </div>
      <div className="message-container" ref={messageContainerRef}>
        <div className="message-scroll">
          {messages.reverse().map((message) => {
            const dateTime = message.createdAt.split("T");
            const date = dateTime[0];
            const time = dateTime[1];
            return (
              <Message key={message.message_id} text={message.message_text} time={time.slice(0, 5)}/>
            )
            })}
        </div>
      </div>
      <div className="enter-message">
        <input
          type="text"
          value={messageTerm}
          onChange={(event) => setMessageTerm(event.target.value)}
          placeholder="Type a message"
        />
        <button type="submit" onClick={handleSend}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}
