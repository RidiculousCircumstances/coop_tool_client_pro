import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ChatStorage } from './storage/chat/Chat.storage';
import { RoomStorage } from './storage/room/Room.storage';
import { UserStorage } from './storage/user/User.storage';


interface StorageInterface {
  userStorage: UserStorage;
  roomStorage: RoomStorage;
  chatStorage: ChatStorage;
}

const storages = {
  userStorage: new UserStorage(),
  roomStorage: new RoomStorage(),
  chatStorage: new ChatStorage(),
}

export const Context = createContext<StorageInterface>(storages);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ ...storages }}>
    <App />
</Context.Provider>


);