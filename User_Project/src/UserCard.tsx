
import React from "react";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { UserListener } from "../App";
import logHOC from "./logHOC";
import { User } from "./user";

interface UserCardProps {
    user: User;
    onDelete:UserListener;
    onEdit: UserListener;
}
 
 const UserCard =  React.forwardRef(({user, onDelete, onEdit}: UserCardProps) => {
  function handleDeleteButton(){
    onDelete(user)
  }
  
    return ( 
    <View>
        <View style={styles.all}>
      <View>
        <Image style={styles.image} source={{uri:user.imageUrl}} />
      </View>
      <View style={styles.names}>
        <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.random}>
        <Text style={styles.text}>{user.username}</Text>
        <Text style={styles.text}>{user.description}</Text>
      </View>
      <View style={styles.buttons}>
      <Pressable style={styles.buttons} onPress={()=>onEdit(user)}>
      <Text style={styles.text}>Edit</Text>
      </Pressable>
      <Pressable style={styles.buttons} onPress={handleDeleteButton}>
      <Text style={styles.text}>Delete</Text>
      </Pressable>
      </View>
      </View>
    </View>
 )})

const styles = StyleSheet.create({
  all: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "lightgray",
    alignItems: 'center',
    textAlign: 'center',
    flexDirection:"row",
    margin:10,
    width:'100%',
    justifyContent: 'space-between'
  },
  image: {
    height:200,
    width:200,

  },
  random:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent: 'space-between'
  },
  buttons:{
    flexDirection:"row",
    padding:10,
  },
  names:{
    display:"flex",
    justifyContent: 'space-between'

  },
  text:{
    fontSize:18,
    fontWeight:"500"
  }
  })
 
export default logHOC(UserCard)