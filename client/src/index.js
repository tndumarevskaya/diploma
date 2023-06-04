import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from 'redux';
import { SocketContext, socket } from './sockets/chat-socket';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
