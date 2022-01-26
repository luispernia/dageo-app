import React, { Props, useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import {Button as ButtonPaper} from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';

function generateUID(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
function CompleteScreen({ navigation }: { navigation: any }) {
    let imgSource = require("../assets/trophy-dynamic-premium.png");
    const [uuid, setUuid] = useState(0);



    useEffect(() => {
        setUuid(generateUID(1, 2000));
        let timeout = setTimeout(() => {
            navigation.navigate("Home");
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
        }, 300000);
          return () => {
              clearTimeout(timeout);
            }
    }, [])

    return (
        <LinearGradient 
        colors={['rgb(169,83,32)', 'rgb(232,162,48)']}
        style={Styles.container}>
            <Image style={{width: 1000, height: 500, position: "absolute", bottom: 0, right: 15}} resizeMode="contain" source={require("../assets/mainCopy.png")} /> 

            <View style={Styles.title}>
                <Text style={[Styles.title_text, {transform: [{translateY: 10}]}]}>¡felicidades ganaste!</Text>
                <View style={Styles.text_container}>
                    <Text style={Styles.sub_text}>tómale una foto a la pantalla{"\n "}y reclama tu premio en caja</Text>
                    <Text style={[Styles.title_text, {color: "rgb(256,236,124)"}, {fontSize: 50}]}>disfrútalo #keepwalking</Text>
                </View>
                    <Text style={[Styles.nr_random, {color: "black"}]}>No. {new Date().toLocaleDateString().split("/")}{new Date().getHours()}{new Date().getMinutes()}</Text>

                <Text style={Styles.date_format}></Text>
            </View>
            <TouchableOpacity style={Styles.button_container} onPress={() => {
                 navigation.navigate("Home");
                 navigation.reset({
                     index: 0,
                     routes: [{name: 'Home'}],
                   });
            }}>
                <Text style={Styles.button_style}>volver al inicio</Text>
            </TouchableOpacity>
            <Image style={{width: 300, height: 300, position: "absolute", right: -91, top: 270}} resizeMode="contain" source={require("../assets/img/cut1.png")} />
            <Image style={{width: 400, height: 400, position: "absolute", right: 100, top: -170}} resizeMode="contain" source={require("../assets/img/cut2.png")} />
            <Image style={{width: 400, height: 400, position: "absolute", left: -186, top: 110}} resizeMode="contain" source={require("../assets/img/cut3.png")} />
            <Image style={{width: 400, height: 400, position: "absolute", left: -100, top: 430}} resizeMode="contain" source={require("../assets/golden_pattern.png")} />
            <Image style={{width: 900, height: 900, position: "absolute", left: 50, top: -160}} resizeMode="contain" source={require("../assets/golden_ticket.png")} />

        </LinearGradient>
    )


}

const Styles = StyleSheet.create({
    date_format: {
        position: "absolute",
        bottom: -180,
        left: 20,
        fontFamily: "Johnnie-Head",
        fontSize: 30,
        color: "white"
    },
    text_container: {
        position: "absolute",
        zIndex: 999999999999999999999999999999,
        bottom: -230,
        right: 220
    },
    sub_text: {
        fontSize: 25,
        fontFamily: "Johnnie-Head",
        color: "white"
    },
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        padding: 20,
        paddingTop: 40
    },
    button: {
        padding: 20
    },
    title: {
        display: "flex",
        flex: .5,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 20
    },
    body: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 650,
        borderRightWidth: 650,
        borderBottomWidth: 1300,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#fcf5e2",
        position: "absolute",
        transform: [{rotate: "-93deg"}, {translateX: 90}]
    
    },
    title_text: {
        fontSize: 50,
        flexWrap: "wrap",
        fontFamily: "Johnnie-Head",
        color: "white",
    },
    button_style: {
        padding: 10,
        backgroundColor: "#ffffffb8",
        width: 180,
        textAlign: "center",
        fontSize: 30,
        fontFamily: "Johnnie-Head",
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        textTransform: "uppercase",
        color: "rgb(251,186,61)",
  
    },
    button_container: {
        position: "absolute",
        bottom: 0,
        zIndex: 9999999999999999999999,
        right: 0
    },
    nr_random: {
        fontFamily: "Johnnie-Regular",
        fontSize: 25,
        padding: 10,
        width: 200,
        textAlign: "center",
        position: "absolute",
        top: 115,
        zIndex: 99999,
        right: 140,
    }
});

export default CompleteScreen
