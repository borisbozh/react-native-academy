import React, { Component, createRef } from 'react';
import { Animated, Dimensions, ImageBackground, ImageStore, ScaledSize, ScrollView, StyleSheet, Text, View } from 'react-native';

export const SAMPLE_IMAGES = ['https://placekitten.com/200/301', 'https://placekitten.com/200/302', 'https://placekitten.com/200/303',
'https://placekitten.com/200/304', 'https://placekitten.com/200/305', 'https://placekitten.com/200/306'];

const window = Dimensions.get("window");

interface LightBoxProps {
    images: string[];
    height: number;
    width?: number
}

interface LightBoxState {
    window: ScaledSize;
}

export default class LightBox extends Component<LightBoxProps, LightBoxState> {
    scrollX = new Animated.Value(0);
    scrollViewRef = createRef<ScrollView>()

    state: Readonly<LightBoxState> = {
        window
    }

    onDimensionsChange = ({ window }: { window: ScaledSize; }) => this.setState({ window })

    componentDidMount(): void {
        Dimensions.addEventListener("change", this.onDimensionsChange);
    }

    get width(){

    }

    render() {
        const windowWidth = this.state.window.width;
        const imageHeight = Math.floor(0.8 * this.props.height);
        return (
            <View style={{ ...styles.scrollContainer, ...{ height: this.props.height, width: windowWidth } }}>
                <ScrollView ref = {this.scrollViewRef}
                    style={{ width: windowWidth }}
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={
                        Animated.event([{
                            nativeEvent: {
                                contentOffset: {
                                    x: this.scrollX
                                }
                            }
                        }])
                    }
                    scrollEventThrottle={1}
                >
                    {
                        this.props.images.map((image, index) => (
                            <View style={{
                                width: windowWidth,
                                height: imageHeight,
                            }} key={index}>
                                <ImageBackground source={{ uri: image }} style={styles.card}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.imageText}>Image - {index + 1} </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {this.props.images.map((image, index) => {
                        const width = this.scrollX.interpolate({
                            inputRange: [windowWidth * (index - 1),
                                         windowWidth * index,
                                         windowWidth * (index + 1)
                            ],
                            outputRange: [15, 25, 15],
                            extrapolate: 'clamp',
                        })
                        return <Animated.View key={index} style={[styles.dot, {width}]}/>
                    })}
                </View>







            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    imageText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    indicatorContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'center'
    },
    dot:{
        height:15,
        width:15,
        borderRadius: 8,
        backgroundColor: "silver",
        marginHorizontal: 4
    },
    textContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:1
    }
})