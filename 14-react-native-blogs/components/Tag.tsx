import React, { Component } from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextStyle,
  View,
} from "react-native";
import { PostListener, TagListener } from "../model/shared-types";

interface IButtonProps {
  style1: TextStyle;
  style2: TextStyle;
  tags: string[];
  onPress: any;
  onFilter: TagListener;
}

export default class TagButton extends Component<IButtonProps, {}> {

    handleFilter = (tag:string) => {
        this.props.onFilter(tag)
    }

  render() {
    const {
      style1,
      style2,
      tags,
      onPress,
      onFilter,
    }: IButtonProps = this.props;
    return (
      <View style={style1}>
        {tags.map((tag) => (
          <Pressable key={tag} onPress={() => this.handleFilter(tag)}>
            <Text key={tag} style={style2}>
              {tag}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }
}
