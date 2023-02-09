import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { Authentication } from './components/authentication/Authentication';
import { RoomList } from './components/RoomList/RoomList';
import { NotifyPopup } from './components/NotifyPopup/NotifyPopup';
import './styles/app.scss';
import { Chat } from './components/Chat/Chat';
import { Button } from './components/Button/Button';
import { ChatStorage } from './storage/chat/Chat.storage';

export const App = observer(() => {
  const { userStorage, roomStorage, chatStorage } = useContext(Context);
  const [activeJoinPopup, setActiveJoinPopup] = useState<boolean>(false);
  const [activeLeavePopup, setActiveLeavePopup] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');

  /**
   * Управляет событием присоединения к комнате
   */
  useEffect(() => {
    const user = roomStorage.getJoinedUser();

    if (!roomStorage.roomJoinData || !user) {
      return;
    }


    setActiveJoinPopup(true);
    setNickname(user.nickname);

    setTimeout(() => {
      setActiveJoinPopup(false);
    }, 3000);

  }, [roomStorage.roomJoinData, roomStorage]);


  /**
   * Управляет событием выхода из комнаты
   */
  useEffect(() => {

    const user = roomStorage.getLeavedUser();

    if (!roomStorage.roomJoinData || !user) {
      return;
    }

    setActiveLeavePopup(true);
    setNickname(user.nickname);

    setTimeout(() => {
      setActiveLeavePopup(false);
    }, 3000);

  }, [roomStorage.roomLeaveData, roomStorage]);



  // const testHandler = () => {
  //   console.log(localStorage.getItem('token'));
  //   console.log(userStorage.userData);
  // }

  return (
    <div className="image">
      <div className="app">

        { userStorage.isAuth ?
          <div style={{ position: 'relative', paddingTop: '20px', paddingLeft: '200px' }}>
            {/* <Button appearence='large' onClick={testHandler}>Тестовая кнопка</Button> */}
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
