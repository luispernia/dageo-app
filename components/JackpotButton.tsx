import React, {useEffect, useRef, useState} from 'react'
import { StyleSheet,View, TouchableOpacity , Text, Animated, Image } from 'react-native'

const randomHexColor = () => {
    return "#000000".replace(/0/g, function() {
      return (~~(Math.random() * 16)).toString(16);
    });
};

function JackpotButton(props) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if(props.click) {
            if(props.opacity) {
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true
                    }
                ).start();
            }
            setEnabled(!enabled);
        }
    }, [props.click])

    return (
        <Animated.View style={{opacity: fadeAnim, position: "absolute", transform: [{rotate: "-15deg"}, {translateX: -27}]}}>
        <TouchableOpacity disabled={enabled} onPress={() => {
             if(props.opacity) {
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true
                    }
                ).start();
            }
    
        props.onPress()
        setEnabled(!enabled);
    
        }} style={[styles.button, {backgroundColor: props.color}]}>
            <Image resizeMode="contain" style={[styles.image_container, {top: -25, transform: [{rotate: "20deg"}]}]} source={require("../assets/jackpot.png")} />
            <Image resizeMode="contain" style={[styles.image_container, {top: 10, transform: [{rotate: "20deg"}]}]} source={require("../assets/toca.png")} />
        </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    image_container: {
        width: 150,
        height: 150,
        position: "absolute",
    },
    button: {
        fontFamily: 'Poppins-Bold',
        padding: 5,
        paddingVertical: 40,
        borderRadius: 0,
        fontSize: 30,
        backgroundColor: 'black',
        alignItems: "center",
        width: 320
      },
      text_button: {
        fontSize: 60,
        color: "white",
        fontFamily: 'Johnnie-Head',
        margin: 0,
      },
      min_title: {
          textAlign: "center",
          textTransform: "uppercase",
          paddingTop: 10,
          fontSize: 20,
          fontFamily: 'Johnnie-Head',

          
      }
})



export default JackpotButton
