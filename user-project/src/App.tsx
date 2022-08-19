import React, { SyntheticEvent, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput';
import { User, UserStatus } from './user_model';
import { toEditorSettings } from 'typescript';
import UserList from './UserList';

const App : React.FC = () => {

  const [user, setuser] = useState<User>()
  const [users, setusers] = useState<User[]>([])

  const handleAdd=() => {
    console.log(user)

    setusers([...users, user as User])

    console.log(users)
  }

  return (
    <div className='App'>
      <span className='heading'>User App</span>
      <UserInput user={user as User} setuser={setuser} handleAdd={handleAdd}/>
      <UserList users={users}/>
    </div>
  );
}

export default App;
