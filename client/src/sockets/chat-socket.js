import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

export const joinRoom = (chatId) => {
  socket.emit('join', chatId);
};

export const sendMessage = (messageData) => {
  socket.emit('createMessage', messageData);
};

export const getMessages = (chatId, callback) => {
  socket.emit('findAllMessages', chatId, (response) => {
    callback(response);
  });
};

export const getChats = (userId, callback) => {
  socket.emit('findAllChats', userId, (response) => {
    callback(response);
  });
};

export default socket;