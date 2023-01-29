import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { Authentication } from './components/authentication/Authentication';
import { ChatList } from './components/ChatList/ChatList';
import { NotifyPopup } from './components/Popup/NotifyPopup';
import './styles/app.scss';

export const App = observer(() => {
  const { userStorage, roomStorage } = useContext(Context);
  const [activeJoinPopup, setActiveJoinPopup] = useState<boolean>(false);
  const [activeLeavePopup, setActiveLeavePopup] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');




  useEffect(() => {
 
    if (roomStorage.roomJoinData) {


      setActiveJoinPopup(true);

      const user = (roomStorage.rooms.map((room) => {
        return room.users.filter((user) => {
          return user.id === roomStorage.roomJoinData?.clientId;
        });
      })).flat()[0];

      setNickname(user.nickname);
    }

    setTimeout(() => {
      setActiveJoinPopup(false);
    }, 3000);

  }, [roomStorage.roomJoinData]);

  useEffect(() => {

    if (roomStorage.roomLeaveData) {


      setActiveLeavePopup(true);

      const user = (roomStorage.rooms.map((room) => {
        return room.users.filter((user) => {
          return user.id === roomStorage.roomLeaveData?.clientId;
        });
      })).flat()[0];

      setNickname(user.nickname);
    }

    setTimeout(() => {
      setActiveLeavePopup(false);
    }, 3000);

  }, [roomStorage.roomLeaveData]);


  return (
    <div className="image">
      <div className="app">
        { userStorage.isAuth ?
          <div>
            <ChatList />

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
