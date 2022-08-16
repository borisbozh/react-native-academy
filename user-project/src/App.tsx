import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput';
import { User } from './user_model';

const App : React.FC = () => {

const [user, setuser] = useState<User>()

  return (
    <div className='App'>
      <span className='heading'>User App</span>
      <UserInput user={user as User} setuser={setuser}/>
    </div>
  );
}

export default App;
