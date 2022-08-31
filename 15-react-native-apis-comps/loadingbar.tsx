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
  min: number;
  max: number;
  current:number
}

export default class Load extends Component<StaggerProps, {}> {
    
  translate = new Animated.Value(this.props.min)
    
  componentDidUpdate(prevProps: StaggerProps){
    Animated.timing(this.translate, {
        toValue: this.props.current,
        duration: (this.props.current - this.props.min)*120,
        useNativeDriver: true,
      }).start();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading.....</Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={
              (StyleSheet.absoluteFill,
              { backgroundColor: "#8BED4F", width: this.translate.interpolate({
                inputRange: [this.props.min, this.props.max],
                outputRange: ["0%", "100%"],
                extrapolate: "clamp",
              })})
            }
          ></Animated.View>
        </View>
        <Text>{this.props.current}%</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
      progressBar: {
        height: 20,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
      },
    });
