import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { UserListener } from "../App";
import { AppStateGeneric, AppStateStoreRegistation } from "./state-store";
import { User } from "./user";
// import './registartionForm.css'
import { Validator, Validators } from "./validators";

interface RigistartionFormProps {
    onCreateUser: UserListener;
    validators: validatorsType;
    edited: User | undefined;
}
export type validatorsType ={
    [P in keyof userFormState]: Validator[];
}

type userFormState = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    gender: string,
    imageUrl: string,
    description: string
}



interface RigistartionFormState{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    gender: string;
    imageUrl: string;
    description: string;

}


 class RigistartionForm extends Component<RigistartionFormProps, RigistartionFormState> {
    state: Readonly<RigistartionFormState> = {
        firstName: this.props.edited?.firstName || ' ',
        lastName: this.props.edited?.lastName || ' ',
        username: this.props.edited?.username || ' ',
        password: this.props.edited?.password || ' ',
        gender: this.props.edited?.gender || ' ',
        imageUrl: this.props.edited?.imageUrl || ' ',
        description: this.props.edited?.description || ' ' 

       
    }
    handleTextChanged(field: string, text: string) {
        const stateUpdate = { [field]: text } as unknown as RigistartionFormState;
        this.setState(stateUpdate);
    }



    handleTodoSubmit =() =>{
        // event.preventDefault();
        console.log(1)
        this.props.onCreateUser(new User(
            this.props.edited?.id || undefined,
            this.state.firstName!,
            this.state.lastName!,
            this.state.username!,
            this.state.password!,
            this.state.gender!,
            this.state.imageUrl!,
            this.state.description!,
            new Date().toISOString(),
            new Date().toISOString()));
      }

      handleRegistrationReset = () => {
        this.setState({firstName:"", lastName:"", gender:"", username:"", password:"", imageUrl:"", description:""})
    }


    render() {
    return (

            <View style={styles.registrationForm}>
            <Text style={styles.header}>Registration</Text>
           <Text style={styles.text}>First Name</Text>
           <TextInput
             style={styles.input}
             value={this.state.firstName}
             onChangeText={this.handleTextChanged.bind(this, "firstName")}
           />
   
           <Text style={styles.text}>Last Name</Text>
           <TextInput
             style={styles.input}
             value={this.state.lastName}
             onChangeText={this.handleTextChanged.bind(this, "lastName")}
           />

           <Text style={styles.text}>Username</Text>
           <TextInput
             style={styles.input}
             value={this.state.username}
             onChangeText={this.handleTextChanged.bind(this, "username")}
           />
   
           <Text style={styles.text}>Password</Text>   
           <TextInput
             style={styles.input}
             value={this.state.password}
             onChangeText={this.handleTextChanged.bind(this, "password")}
           />

           <Text style={styles.text}>Gender</Text>
           <TextInput
             style={styles.input}
             value={this.state.gender}
             onChangeText={this.handleTextChanged.bind(this, "gender")}
           />
   
           <Text style={styles.text}>Profile Image</Text>
           <TextInput
             style={styles.input}
             value={this.state.imageUrl}
             onChangeText={this.handleTextChanged.bind(this, "imageUrl")}
           />
           <Text style={styles.text}>Description</Text>
   
           <TextInput
             style={styles.input}
             value={this.state.description}
             onChangeText={this.handleTextChanged.bind(this, "description")}
           />
           <View style={styles.btnContainer}>
             <Pressable style={{ ...styles.button, backgroundColor: "lightgreen" }}
             onPress={this.handleTodoSubmit}
           ><Text style={styles.text1}>Register</Text></Pressable>
             <Pressable style={{ ...styles.button, backgroundColor: "#F65A83" }}
             onPress={this.handleRegistrationReset}
           ><Text style={styles.text1}>Reset</Text></Pressable>
           </View>
           </View>
            );
    }
}

const styles = StyleSheet.create({
    registrationForm: {
      width: "80%",
      backgroundColor: "lightgray",
      borderRadius: 10,
      padding: 15,
      alignItems: "stretch",
      paddingHorizontal: 40,
      paddingBottom: 30,
      marginTop:10,
    },
    header: {
      fontWeight: "bold",
      fontSize: 36,
      alignSelf: "center",
      padding: 5,
      paddingBottom:20,
    },
    input: {
      borderColor: "#6E85B7",
      borderWidth: 2,
      borderRadius: 5,
      marginBottom:5,
      padding:5,
      fontSize:18
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      marginTop:10,
      justifyContent: 'space-evenly'
    },
    button: {
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      width: "40%",
    },
    text:{
      padding:3,
      fontWeight:'600',
      fontSize:17
    },
    text1:{
      fontSize:16,
      fontWeight:'500'
    }
  
  })

export default RigistartionForm;