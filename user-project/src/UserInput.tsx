import React, { useState } from "react";
import { User, UserStatus } from "./user_model";

interface Props {
  user: User;
  setuser: React.Dispatch<React.SetStateAction<User | undefined>>;
  handleAdd:()=>void
}

const UserInput = ({ user, setuser, handleAdd}: Props) => {
    const [firstName, setfirstName] = useState("")
    const [secondName, setsecondName] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

function handleUserSubmit(event: React.FormEvent) {
      event.preventDefault();
      setuser (new User(
         firstName, secondName, username, password, UserStatus.Completed))
      console.log(1)
      setfirstName("")
      setsecondName("")
      setusername("")
      setpassword("")
      handleAdd()
      }

  return (
    <form className="input" onSubmit={(e) => handleUserSubmit(e)}>
      <label className="input_label" htmlFor="TodoInput-todo-text">
        Registartion Form
      </label>
      <input
        value={firstName}
        className="input_box"
        type="text"
        placeholder="Enter first name"
        id="TodoInput-todo-text"
        name="firstName"
        onChange={(e) => setfirstName(e.target.value)}
      />
      <input
        value={secondName}
        className="input_box"
        type="text"
        placeholder="Enter last name"
        id="TodoInput-todo-text1"
        name="secondName"
        onChange={(e) => setsecondName(e.target.value)}
      />
      <input
        value={username}
        className="input_box"
        type="text"
        placeholder="Enter username"
        id="TodoInput-todo-text2"
        name="username"
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        value={password}
        className="input_box"
        type="text"
        placeholder="Enter password"
        id="TodoInput-todo-text3"
        name="password"
        onChange={(e) => setpassword(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Register
      </button>
    </form>
  );
};

export default UserInput;
