import React, { Component } from "react";
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";

interface StaggerProps {
  X: number;
  Y: number;
}

export default class Load extends Component<StaggerProps, {}> {
  translate = [
    new Animated.ValueXY({ x: -200, y: 100 }),
    new Animated.ValueXY({ x: -200, y: 250 }),
    new Animated.ValueXY({ x: -200, y: 400 }),
  ];

  componentDidUpdate(prevProps: StaggerProps) {
    Animated.sequence([
      Animated.timing(
        this.translate[0].x, {
        toValue: this.props.X,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(
        this.translate[0].x, {
        toValue: -200,
        delay: 2500,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(
        this.translate[1].x, {
        toValue: this.props.X,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(
        this.translate[1].x, {
        toValue: -200,
        delay: 2500,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(
        this.translate[2].x, {
        toValue: this.props.X,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(
        this.translate[2].x, {
        toValue: -200,
        delay: 2500,
        duration: 1500,
        useNativeDriver: true,
      })
    ]).start();
  }

  render() {
    return (
      <View>
        {this.translate.map((toster) => (
          <Animated.View
            style={{
              borderWidth: 2,
              height: 75,
              width: 200,
              backgroundColor: "#8BED4F",
              transform: [
                {
                  translateX: toster.x,
                },
                {
                  translateY: toster.y,
                },
              ],
            }}
          ></Animated.View>
        ))}
      </View>
    );
  }
}
