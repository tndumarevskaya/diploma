import React from 'react'
import SearchComponent from './SearchComponent'
import Message from './Message'

export default function AllMessages() {
  const messages = [
    { id: 1, content: 'Chat 1' },
    { id: 2, content: 'Chat 2' },
  ]

  return (
    <div className='all-messages'>
        <SearchComponent />
        {messages.map(message => (
          <Message key={message.id} chatId={message.id} />
        ))}
    </div>
  )
}