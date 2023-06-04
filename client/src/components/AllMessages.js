import React, { useContext, useEffect, useState } from 'react'
import SearchComponent from './SearchComponent'
import Message from './Message'
import { getChats } from '../sockets/chat-socket';

export default function AllMessages({userId}) {
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
    getChats(userId, (response) => {
      setChats(response);
    });
  }, [userId]);

  return (
    <div className='all-messages'>
        <SearchComponent />
        {chats.map(chat => (
          <Message key={chat.chat_id} chat={chat} />
        ))}
    </div>
  )
}