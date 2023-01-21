import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '.';
import { Authentication } from './components/authentication/Authentication';
import './styles/app.scss';

export const App = observer(() => {
  const context = useContext(Context);
  return (
    <div className="image">
      <div className="app">
        {context.userStorage.isAuth ?
          <div></div> :
          <Authentication />}
      </div>
    </div>

  )


})

export default App;
