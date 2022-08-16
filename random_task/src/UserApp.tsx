import { Component } from "react";
import { User } from "./UserClass";

interface UserAppState {
    users: User[];
  }

  export interface UserListener {
    (user: User): void;
  }

class UserApp extends Component<{}, UserAppState> {
    state: Readonly<UserAppState> = {
        users: []
    }
    constructor(props: {}) {
      super(props)
    //   this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
    }
  
    // handleUpdateTodo(user: User) {
    //   this.setState(({users}) => ({
    //     users: users.map(us => us.id === user.id ? user : us)
    //   }))
    // }
  
    // handleDeleteTodo = (user: User) => {
    //   this.setState(({ users }) => ({
    //     users: users.filter(us => us.id !== user.id)
    //   }))
    // }
  
    handleCreateTodo = (user: User) => {
      this.setState(({ users }) => ({
        users: users.concat(user)
      }))
    }
  
  
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h2>TODO Demo</h2>
            <UserInput onCreateTodo={this.handleCreateTodo} />
            <UserList/>
          </header>
        </div>
      );
    }
  }
  
  export default UserApp;