import { GestureResponderEvent, Pressable, Text, TextStyle } from 'react-native';

interface IButtonProps {
  style1:TextStyle;
  style2:TextStyle;
  onPress: any;
  title:string;
}

export const AppButton = ({style1, onPress, title, style2 }:IButtonProps) => (
    <Pressable style={style1} onPress={onPress} >
      <Text style={style2}>{title}</Text>
    </Pressable>
  );