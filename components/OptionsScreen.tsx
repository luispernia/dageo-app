import React, {useContext, useEffect} from 'react'
import {View, Text, Button, StyleSheet, Image, TouchableOpacity, ImageBackground} from "react-native";
import patternContext from '../services/context/PatternContext';
import { LinearGradient } from 'expo-linear-gradient';

function OptionsScreen({navigation, route}:  any) {
    const url = {uri: "https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/color/glass-dynamic-color.png"};
    const {setJohnnie} = useContext(patternContext);
    
    useEffect(() => {
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
        <>
        <View style={Styles.container}>
            <LinearGradient
                    colors={['rgb(169,83,32)', 'rgb(232,162,48)']}
            style={Styles.title}>
 <TouchableOpacity onPress={() => {
                                navigation.navigate("FormScreenOne");
                                navigation.reset({
                                    index: 0,
                                    routes: [{name: 'FormScreenOne'}],
                                  });
                                }} style={{position: "absolute",zIndex: 999999999999999, bottom:300 , left: 80}}>
                                    <Text style={Styles.button_style}>clic para aprender</Text>
                                </TouchableOpacity>   
                <View style={Styles.box_container}>
                    <View style={Styles.box}>
                    <View style={Styles.boxLayout}>
                            <ImageBackground style={Styles.image} source={require("../assets/img/walker1.png")}>
                            </ImageBackground>
                            <View style={[Styles.box_text, {transform: [{translateY: 30}]}]}>
                                <View style={Styles.option_body}>
                                 <Text style={Styles.option_title}>Tu highball{"\n"}preferido</Text>        
                                <Text style={Styles.option_description}>te recomendamos el highball perfecto{"\n"}para ti según tus gustos.</Text>
                                    
                                <View style={[Styles.separator, {position: "absolute", bottom: 60}]} />

                                </View>    
                            </View>
                        </View> 

                    </View>
                    <View style={Styles.box}>
                        <View style={Styles.boxLayout}>
                            <ImageBackground style={Styles.image} source={require("../assets/img/jackpot.png")}>
                            <Image style={{width: 1000, height: 500, position: "absolute", bottom: 0, right: 20}} resizeMode="contain" source={require("../assets/mainCopy.png")} /> 

                            </ImageBackground>
                            <View style={[Styles.box_text, {transform: [{translateY: 0}]}]}>
                                <View style={Styles.option_body}>
                                 <Text style={Styles.option_title}>hay un highball{"\n"}en tu futuro</Text>        
                                 <Text style={Styles.option_description}>encuentra tu highball ideal, si no sabes{"\n"}cuál elegir, déjalo a la suerte.</Text>        
                                 <TouchableOpacity onPress={() => {
                                        setJohnnie("");
                                        navigation.navigate("Splide");
                                        navigation.reset({
                                            index: 0,
                                            routes: [{name: 'Splide'}],
                                          });
                                    }} style={{position: "absolute",zIndex: 999999999999999, bottom: 50}}>
                                    <Text style={Styles.button_style}>clic para descubrir</Text>
                                </TouchableOpacity>        
                                </View>    
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
     
            {/* <View> This will be the body function for this app

            </View> */}
        </View>
        </>
    )
}

const Styles = StyleSheet.create({
    image: {
        flex: .4,
        marginRight: 60,
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
        width: 350,
        textAlign: "center",
        fontSize: 32,
        fontFamily: "Johnnie-Head",
        marginVertical: 10,
        borderRadius: 5,
        textTransform: "uppercase",
        color: "rgb(251,186,61)",
    },
    option_small_text: {
        fontSize: 18,
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
        flex: 1,
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
        transform: [{translateY: 20}, {translateX: 80}]
    },
    box_text: {
        flex: .6,
        flexDirection: "row"
    },
    option_title: {
        fontFamily: "Johnnie-Head",
        fontSize: 60,
        color: "rgb(253,208,108)",
        textTransform: "uppercase",
        lineHeight: 50,
        paddingTop: 10
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

export default OptionsScreen
