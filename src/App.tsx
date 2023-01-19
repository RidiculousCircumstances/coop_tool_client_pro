import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '.';
import { Authentication } from './components/authentication/Authentication';
import './styles/app.scss';

export const App = observer(() => {
  const context = useContext(Context);
  return (
    <div className="app">
      {context.userStorage.isAuth ? 
        <div> <img width={1700} src="https://avatars.mds.yandex.net/i?id=bfe4e51b953a3c5ff084bb93fd149895c6ef38c2-6961938-images-thumbs&n=13"></img></div> :
        <Authentication />}
    </div>
  )


})

export default App;
