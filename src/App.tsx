import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { Authentication } from './components/authentication/Authentication';
import { RoomList } from './components/RoomList/RoomList';
import { NotifyPopup } from './components/Popup/NotifyPopup';
import './styles/app.scss';
import { Chat } from './components/Chat/Chat';

export const App = observer(() => {
  const { userStorage, roomStorage } = useContext(Context);
  const [activeJoinPopup, setActiveJoinPopup] = useState<boolean>(false);
  const [activeLeavePopup, setActiveLeavePopup] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');



  /**
   * Управляет событием присоединения к комнате
   */
  useEffect(() => {
 
    if (roomStorage.roomJoinData) {

      const user = roomStorage.getJoinedUser();
      setActiveJoinPopup(true);
      setNickname(user!.nickname);
    }

    setTimeout(() => {
      setActiveJoinPopup(false);
    }, 3000);

  }, [roomStorage.roomJoinData, roomStorage]);


  /**
   * Управляет событием выхода из комнаты
   */
  useEffect(() => {

    if (roomStorage.roomJoinData) {

      const user = roomStorage.getLeavedUser();
      setActiveLeavePopup(true);
      setNickname(user!.nickname);
    }

    setTimeout(() => {
      setActiveLeavePopup(false);
    }, 3000);

  }, [roomStorage.roomLeaveData, roomStorage]);


  return (
    <div className="image">
      <div className="app">

        { userStorage.isAuth ?
          <div style={{ position: 'relative', top: '20px', left: '20px' }}>

            <Chat />

            <RoomList />

            <NotifyPopup active={activeJoinPopup}>
                <span>{nickname} присоединился к комнате</span>
            </NotifyPopup>

            <NotifyPopup active={activeLeavePopup}>
              <span>{nickname} вышел из комнаты</span>
            </NotifyPopup>

          </div> :

          <Authentication /> 
        }

      </div>
    </div>

  )


})

export default App;
