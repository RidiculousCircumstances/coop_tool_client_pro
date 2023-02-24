import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '.';
import { Authentication } from './components/authentication/Authentication';
import './styles/app.scss';
import { RoomLayout } from './layout/RoomLayout';

export const App = observer(() => {
  const { userStorage } = useContext(Context);
 
  return (
    <div className="image">
      <div className="app">
        { userStorage.isAuth ?
          <RoomLayout />
          :
          <Authentication />
        }
      </div>
    </div>
  )
})

