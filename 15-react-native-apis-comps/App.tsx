import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Load from "./loadingbar";

const App = () => {
    const [current, setCurrent] = useState(0);

    function handleClick() {
        setCurrent(60)
    }

    return(
    <View>
    <Load min={0} max={100} current = {current}/> 
    <Pressable onPress={handleClick}>
        <Text>Click</Text>
    </Pressable>
    </View>
    )
}

export default App