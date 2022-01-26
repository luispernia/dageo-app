import React, {useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Video } from 'expo-av';

const { height } = Dimensions.get("window");

function HomeScreen({ navigation }: { navigation: any }) {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    useEffect(() => {
        video.current.playAsync();
  
    }, [])

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => {
            navigation.navigate("Overview");
            navigation.reset({
                index: 0,
                routes: [{name: 'Overview'}],
              });
        }} style={Styles.container}>
            <Image style={{width: 1000, height: 65, position: "absolute", bottom: 0}} resizeMode="contain" source={require("../assets/alter.png")} /> 
            <View style={Styles.title}>
                <Text style={Styles.title_text}>¡hey, tú!</Text>
                <Text style={Styles.sub_text}>toca la pantalla</Text>
                <Text style={Styles.ad_text}>participa para ganarte,{"\n"}un golden ticket y canjéalo{"\n"}por premios</Text>
                <Image resizeMode="contain" style={Styles.cut1} source={require("../assets/img/cut1.png")} />
                <Image resizeMode="contain" style={Styles.cut2} source={require("../assets/img/cut2.png")} />
                <Image resizeMode="contain" style={Styles.cut3} source={require("../assets/img/cut3.png")} />

            </View>
            <Video
                ref={video}
                style={[Styles.video, {transform: [{translateX: 0}]}]}
                source={require(`../assets/video/video.mp4`)}
                resizeMode={"cover"}

                isLooping={true}
                
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />

        </TouchableOpacity>
    )


}

const Styles = StyleSheet.create({
    ad_text: {
        fontSize: 27,
        fontFamily: "Johnnie-Head",
        textTransform: "uppercase",
        color: "white",
        paddingLeft: 100,
        margin: 0,
        transform: [{translateY: -30}]
    },
    small_text: {
        fontSize: 20,
        fontFamily: "Johnnie-Head",
        textTransform: "uppercase",
        color: "white",
        paddingLeft: 60,
        margin: 0,
        transform: [{translateY: 100}]
    },
    sub_text: {
        fontSize: 80,
        fontFamily: "Johnnie-Head",
        textTransform: "uppercase",
        color: "white",
        paddingLeft: 100,
        margin: 0,
        transform: [{translateY: -30}]
    },
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },
    button: {
        padding: 20,    
        paddingTop: 60
    },
    title: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 20,
    },
    body: {
        display: "flex",
        justifyContent: "center",
        flex: .3
    },
    title_text: {
        fontSize: 120,
        fontFamily: "Johnnie-Head",
        textTransform: "uppercase",
        color: "white",
        paddingLeft: 50,
        paddingTop: 50,
    },
    glassStick1: {
        width: 20,
        height: 272,
        right: 530,
        top: 10,
        backgroundColor: "red",
        position: 'absolute',
        transform: [{skewY: "-10deg"}]

    },
    glassStick2: {
        width: 10,
        height: 272,
        position: 'absolute',
        right:344,
        top: 20,
        backgroundColor: "cornflowerblue",
        transform: [{skewY: "8deg"}]
    },
    bottom: {
        width: 20,
        height: 20,
        bottom: 0,
        position: 'absolute',
        backgroundColor: "lime",
    },
    borrow: {
        width: 100,
        height: 310,
        right: 242,
        transform: [{skewY: "10deg"}],
        position: 'absolute',
        backgroundColor: "white",
    },
    video: {
        width:1400,
        alignItems: "flex-end",
        height: height,
        position: 'absolute',
        top:-50,
        zIndex: -1,

      },
    cut1: {
        width: 200,
        height: 300,
        position: "absolute",
        bottom: 0,
        right: 0,
        transform: [{translateY: -40}, {translateX: 42}]

    },
    cut2: {
        width: 400,
        height: 300,
        position: "absolute",
        top: 0,
        right: 0,
        transform: [{translateY: -120}, {translateX: -80}]
    },
    cut3: {
        width: 200,
        height: 400,
        position: "absolute",
        bottom: 0,
        left: 0,
        transform: [{translateY: -120}, {translateX: -86}]

    }
});

export default HomeScreen
