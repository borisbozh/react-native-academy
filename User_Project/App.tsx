import { Component } from 'react';
// import './App.css';
import RigistartionForm, { validatorsType } from './src/registartionForm';
import { UsersRepo } from './src/repository';
import UsersInfo from './src/ShowUserInfo';
import { User } from "./src/user";
import UserCard from './src/UserCard';
import { Validators } from './src/validators';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export interface UserListener{
  (user: User): void;
}


interface AppState{
  users: User[];
  edited: User | undefined
}

class App extends Component<{},AppState> {

  state: Readonly<AppState> ={
    users: [],
    edited: undefined
  }
  validators:validatorsType =  {
    firstName: [Validators.required(), Validators.len(2, 15)],
        lastName: [Validators.required(), Validators.len(2, 15)],
        username: [Validators.required(), Validators.len(5, 15), Validators.uniqueUsername()],
        password: [Validators.required(), Validators.len(8), Validators.isPass()],
        gender: [Validators.required()],
        imageUrl: [Validators.required(), Validators.pattern(new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+,.[^,s]{2,})"))],
        description: [Validators.len(0, 512)],
  }

async componentDidMount() {
  const allUsers = await UsersRepo.findAll();
  this.setState({
    users: allUsers
  });
}

  handleCreateUser = async (user: User) =>{
    if(this.state.edited){
      const updated = await UsersRepo.update(user);

      this.setState(({users}) => ({users: users.map((user) => user.id === updated.id? updated: user), edited: undefined}));
      
    }else{
      const createdUser = await UsersRepo.create(user);

      this.setState(({users}) => ({users: users.concat(createdUser)}));
    }
   
  }

  handleDeleteUser = async (user: User) =>{
    await UsersRepo.delete(user.id!);

    this.setState(({users}) => ({users: users.filter((elem) => elem.id!== user.id)}));
      
  }
  
  handleEdit = (user: User)=>{
    this.setState({edited: user});
  }


  
  render(): React.ReactNode {

    return (
      <View style={styles.app}>
        <View style={styles.appheader}>
          
            <RigistartionForm onCreateUser={this.handleCreateUser} validators={this.validators} edited={this.state.edited} key={this.state.edited?.id} />
            <UsersInfo users={this.state.users} onDelete={this.handleDeleteUser} onEdit={this.handleEdit} Comp={UserCard}/>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  appheader: {
    minHeight:100,
    display:'flex',
    flexDirection:"column",
    color:"black",
    justifyContent:"center"
}})

export default App;
