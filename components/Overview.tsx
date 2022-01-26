import React, {useContext, useEffect} from 'react'
import {View, Text, Button, StyleSheet, Image, TouchableOpacity, ImageBackground} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';

function Overview({navigation, route}:  any) {    

    useEffect(() => {
        let timeout = setTimeout(() => {
            navigation.navigate("Home");
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
        }, 300000);
        let data = {
            name: "Luis Pernia"
        };
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "test.txt", JSON.stringify(data));
        console.log(FileSystem.readAsStringAsync(FileSystem.documentDirectory + "test.txt").then(res => {
            console.log(res);
        }));
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    return (
        <View style={Styles.container}>
            <LinearGradient
                colors={['rgb(169,83,32)', 'rgb(232,162,48)']}
                style={Styles.title}>
                                <Image style={{width: 1000, height: 500, position: "absolute", bottom: 0}} resizeMode="contain" source={require("../assets/mainCopy.png")} /> 

                <Image resizeMode="contain" style={Styles.rightImageSource} source={require("../assets/img/cut1.png")} />
                <View style={Styles.box_container}>
                    <Text style={[Styles.smallText, {padding:20,fontSize: 35, transform: [{translateY: 20}]}]}>atrévete a experimentar nuevas sensaciones</Text>
                </View>
                <View style={Styles.grid}>
                    <View style={Styles.leftTitle}>
                        <Text style={Styles.main_heading}>Bienvenido{"\n"}a la casa{"\n     "}de los{"\n     "}highballs</Text>
                        <Text style={[Styles.smallText, {paddingLeft: 61, paddingTop: 10}]}>¿sabías que{"\n"}preparar un highball{"\n"}es muy fácil?</Text>

                    </View>
                    <View style={[Styles.rightImage]}>
                        <Image resizeMode="contain" style={{width: 600, height: 600}} source={require('../assets/glass.png')} />
                    </View>
                    <Text style={[Styles.text_title, {right: 190, top: 100, paddingTop: 10}]}>guarnición {"\n"}y hielo</Text>
                    <Text style={[Styles.text_title, {right: 220, top: 180}]}>3 partes {"\n"}de mixer</Text>
                    <Text style={[Styles.text_head, {right: 295, top:240}]}>150ml</Text>
                    <Text style={[Styles.text_title, {right: 245, top: 270}]}>1 parte{"\n"}johnnie{"\n"}walker</Text>
                    <Text style={[Styles.text_head, {right: 310 , top: 360}]}>45ml</Text>

                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Options");
                    navigation.reset({
                    index: 0,
                    routes: [{name: 'Options'}],
                    });
                }} style={{position: "absolute", zIndex: 9999999999999999, bottom: 70}}>
                    <Text style={Styles.button_style}>clic aquí para empezar</Text>
                </TouchableOpacity>   
            </LinearGradient>
     
            {/* <View> This will be the body function for this app

            </View> */}
        </View>
    )
}

const Styles = StyleSheet.create({
    text_title: {
        fontFamily: "Johnnie-Head",
        color: "white",
        fontSize: 35,
        position:"absolute",
        lineHeight: 35,
        transform: [{scale: .8}]
    },
    text_head: {
        fontFamily: "Johnnie-Head",
        color: "white",
        position: "absolute",
        fontSize: 20,
        transform: [{scale: .8}]

    },
    rightImageSource: {
        width: 300,
        height: 300,
        position: "absolute",
        right: -91,
        bottom: 30
    },
    main_heading: {
        fontFamily: "Johnnie-Head",
        fontSize: 60,
        color: "white",
        lineHeight: 50,
        textAlign: "justify",
        padding: 10
    },
    smallText: {
        fontFamily: "Johnnie-Head",
        fontSize: 25,
        color: "rgb(253,208,108)",
        lineHeight: 25
    },
    grid: {
        flex: 1,
        flexDirection: "row", 
        transform: [{translateX: 70}]
    },
    leftTitle: {
        flex: .5,
        paddingLeft: 80,
        paddingTop: 30,
        transform: [{translateX: 10}, {translateY: 30}]
    },
    rightImage: {
        flex: .5,
        alignItems: "center",
        justifyContent: "center",
        transform: [{translateX: -200}, {translateY: -65}, {scale: .8}]
    },
    image: {
        flex: .4,
        marginRight: 60
    },
    separator: {
        borderWidth: .5,
        width: 350,
        borderColor: "rgb(244,194,52)",
        transform: [{translateY: 20}]
    },
    button_style: {
        padding: 10,
        backgroundColor: "white",
        width: 300,
        textAlign: "center",
        fontSize: 32,
        fontFamily: "Johnnie-Head",
        marginVertical: 0,
        borderRadius: 5,
        textTransform: "uppercase",
        color: "rgb(251,186,61)",
    },
    option_small_text: {
        fontSize: 17,
        color: "white",
        fontFamily: "Johnnie-Head",
        paddingTop: 10,
        textTransform: "uppercase"
    },
    option_description: {
        color: "white",
        fontFamily: "Johnnie-Head",
        textTransform: "uppercase",
        paddingTop: 10,
        fontSize: 20
    },
    header_title: {
        display: "flex",
    },
    boxLayout: {
        flexDirection: "row-reverse",
        flex: 1
    },
    box_container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    option_number: {
        flex: .3,
        fontSize: 120,
        color: "white",
        textAlign: "center",
        fontFamily: "Johnnie-Regular"
    },
    box: {
        display: "flex",
        flex: 1,
        flexDirection: "row"
    },
    option_body: {
        flex: 1,
        transform: [{translateY: 20}]
    },
    box_text: {
        flex: .6,
        flexDirection: "row"
    },
    option_title: {
        fontFamily: "Johnnie-Head",
        fontSize: 40,
        color: "rgb(253,208,108)",
        textTransform: "uppercase",
    },
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
    },
    button: {
        padding: 20
    },
    title: {    
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    },
    body: {
        display: "flex",
        justifyContent: "center",
        flex: .4
    },
    title_text: {
        fontSize: 24,
        fontWeight: "700",
        flexWrap: "wrap",
    }
});

export default Overview;
