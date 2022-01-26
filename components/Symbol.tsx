import React, { useEffect } from 'react'
import Images from "../assets/Images";
import { View, StyleSheet, Image, Animated } from "react-native";
import { useContext } from 'react';
import patternContext from '../services/context/PatternContext';
import FastImage from "react-native-fast-image";
import ExpoFastImage from 'expo-fast-image'

const Symbol = React.forwardRef((props, ref) => {

    const { setWidth, setHeight, width, height } = useContext(patternContext);

    const getImage = () => {
        switch (props.symbol) {
            case 'A':
                return Images.grapes1
            case 'B':
                return Images.grapes2
            case 'C':
                return Images.grapes3
            case 'D':
                return Images.orange1
            case 'E':
                return Images.orange2
            case 'F':
                return Images.orange3
            case 'G':
                return Images.coctel1
            case 'H':
                return Images.coctel2
            case 'I':
                return Images.coctel3
            case 'J':
                return Images.strawberry1
            case 'K':
                return Images.strawberry2
            case 'L':
                return Images.strawberry3
            default:
                break
        }
    }

    useEffect(() => {
        setWidth(props.width)
        setHeight(props.height)
    }, [props.width])

    let symbolSource = getImage();
    return (
        <Animated.View style={[styles.symbol]} >
            <ExpoFastImage style={[styles.image, { width: 2140.25, height: height / 3}]} source={symbolSource} />
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    symbol: {
        backgroundColor: "rgb(252,245,226)"
    },
    image: {
        flex: 1,
    }
});

export default Symbol
