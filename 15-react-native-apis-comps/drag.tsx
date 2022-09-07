import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
    PanResponderGestureState,
    GestureResponderEvent,
    Text,
    SafeAreaView
} from "react-native";

const CIRCLE_RADIUS = 30;
const LOG_PANEL_HEIGHT= 30;
const DROP_ZONE_HEIGHT = 100;

let state = 0

interface Point {
    x: number;
    y: number;
}

interface DraggableProps {
    position:Point
}

interface DraggableState {
    panState: Point | undefined;
}

export default class Draggable extends Component<DraggableProps, DraggableState> {
    panValue = new Animated.ValueXY(this.props.position);
    opValue = new Animated.Value(1);
    state: Readonly<DraggableState> = {
        panState: undefined,
    };
    // private _val: Point;
    private panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            // console.log({...gestureState});
            this.setState({ panState: { x: gestureState.moveX, y: gestureState.moveY } })
            Animated.event([
                { nativeEvent: { pageX: this.panValue.x, pageY: this.panValue.y } }, null
            ], {
                useNativeDriver: false,
            })(e, gestureState);
        },

        onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            gestureState.moveY>LOG_PANEL_HEIGHT+DROP_ZONE_HEIGHT?
            Animated.spring(this.panValue, {
                toValue: this.props.position,
                friction: 5,
                useNativeDriver: false,
            }).start():
            Animated.sequence([
            Animated.spring(this.opValue, {
                toValue: 0,
                friction: 5,
                useNativeDriver: false,
            }),
            Animated.timing(
                this.panValue, {
                toValue: this.props.position,
                delay: 100,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(
                this.opValue, {
                toValue: 1,
                duration:1,
                useNativeDriver: true,
              }),]).start()
        },

        onPanResponderTerminate: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            Animated.spring(this.panValue, {
                toValue: this.props.position,
                friction: 5,
                useNativeDriver: false,
            }).start();
        },
    });

    // componentWillMount() {
    // Add a listener for the delta value change
    // this._val = { x: 0, y: 0 }
    // this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    //     this.panResponder = 
    // }

    render() {
        const panStyle = {
            transform: [{
                translateX: Animated.subtract(this.panValue.x, CIRCLE_RADIUS)
            }, {
                translateY: Animated.subtract(this.panValue.y, CIRCLE_RADIUS + LOG_PANEL_HEIGHT + DROP_ZONE_HEIGHT)
            }]
        }
        return (
            <View style={styles.conatainer}  >
                <View style={styles.textConatainer}>
                    <Text>{this.state.panState?.x}, {this.state.panState?.y}</Text>
                </View>
                <View style={styles.dropZone}>
                    <Text style={styles.dropZoneText}>Drop them here!</Text>
                </View>
                <Animated.View
                    {...this.panResponder.panHandlers}
                    // onStartShouldSetResponder={() => true}
                    // onMoveShouldSetResponder={() => true}
                    // onResponderMove={(event) => {
                    //     Animated.event([
                    //         { nativeEvent: { pageX: this.panValue.x, pageY: this.panValue.y } }, null
                    //     ], {
                    //         useNativeDriver: false,
                    //     })(event, null);
                    // }}
                    style={{ ...panStyle, ...styles.circle, opacity:this.opValue } }
                />
                <StatusBar hidden />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    conatainer: {
        flex: 1,
    },
    textConatainer: {
        width: '100%',
        height: LOG_PANEL_HEIGHT,
    },
    circle: {
        zIndex: 1,
        backgroundColor: "skyblue",
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
    },
    dropZone: {
        backgroundColor:"green"
    },
    dropZoneText: {
        height: DROP_ZONE_HEIGHT
    },
});