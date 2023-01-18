import { observer } from 'mobx-react-lite';
import { Authentication } from './components/authentication/Authentication';
import './styles/app.scss';

export const App = observer(() => {

  return (
    <div className="app">
      {/* {userStorage.isAuth() ? 
      <input onClick={() => userStorage.setUser(true)}>Авторизован</input> 
        : <Authentication />} */}

      <Authentication />
    </div>
  )


})

export default App;
