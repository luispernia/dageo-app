import React, { useState, useRef, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Animated, TouchableOpacity, BackHandler, Alert } from "react-native";
import { Button as ButtonPaper, RadioButton, Checkbox } from "react-native-paper";
import patternContext from '../services/context/PatternContext';
import Images from '../assets/Images';
import { LinearGradient } from 'expo-linear-gradient';

export function FormScreens({ navigation, route }: any) {
    return (
        <LinearGradient
        colors={['rgb(169,83,32)', 'rgb(232,162,48)']}
        style={Styles.container}>
            <Text style={Styles.main_title}>Welcome to form screens</Text>
            <ButtonPaper onPress={() => {
                navigation.navigate("FormScreenOne");
                
            }}>
                Next
            </ButtonPaper>
        </LinearGradient>
    )
}

export function FormScreenOne({ navigation, route }: any) {

    const [text, setText] = useState('');
    const transAnim = useRef(new Animated.Value(-100)).current;
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);

    
    const clear = () => {
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
    }

    useEffect(() => {
        Animated.spring(
            transAnim,
            {
                toValue: 0,
                useNativeDriver: true
            }
        ).start();
        const backAction = () => {
            Alert.alert("¡ Espera!", "Perderas todo tu progreso, ¿deseas volver al inicio?", [
              {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel"
              },
              {
                text: "Si",
                onPress: () => {
                    navigation.navigate("Home")
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                    });
                }
              }
            ]);
            return true;
          }
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );

          let timeout = setTimeout(() => {
            navigation.navigate("Home");
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
        }, 300000);
          return () => {
              backHandler.remove();
              clearTimeout(timeout);
            }
    }, [])

    return (
        <LinearGradient
        colors={['rgb(169,83,32)', 'rgb(232,162,48)']}

        style={Styles.container}>

                  <View style={Styles.image_container}>
            <Image resizeMode="contain" style={Styles.cut3} source={require("../assets/img/cut1.png")} />
            </View>
            <Animated.View style={[Styles.bannerSide]} >
               <ImageBackground style={[Styles.leftImage, {flex: 1, padding: 20}]} source={Images.walker1} >
                    <Text style={[Styles.imageTitle, {color: "rgba(234,170,0,255)"}]}>{"  "}tu{"\n"}highball{"\n  "}preferido</Text>
                    <Text style={[Styles.subTitleImage, {color: "rgba(234,170,0,255)"}]}>descubramos juntos tu perfil de sabor, empieza respondiendo estas{"\n"}preguntas simples</Text>
                    <Image style={{width: 1000, height: 400, position: "absolute", bottom: 0, right: -500}} resizeMode="contain" source={require("../assets/copy_white.png")} /> 

                </ImageBackground>
            </Animated.View>
            <View style={Styles.formSide}>
            <Text style={Styles.number_indicator}>Pregunta 1/3</Text> 
            <View style={{flex: 1, padding: 50}}>           
            <Text style={Styles.title_heading}>tu lugar{"\n"}preferido</Text>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"
                    status={checked1? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setEnabled(checked1);
                        setChecked1(!checked1)
                        navigation.navigate("FormScreenTwo");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenTwo'}],
                          });
                    }}
                /> 
                     <TouchableOpacity onPress={() => {
                     clear();
                     setEnabled(checked1);
                     setChecked1(!checked1)
                     navigation.navigate("FormScreenTwo");
                     navigation.reset({
                         index: 0,
                         routes: [{name: 'FormScreenTwo'}],
                       });
                }}>
                    <Text style={Styles.checkbox_text}>en casa</Text>
                </TouchableOpacity>
            </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <View>
                    <Checkbox 
                        theme={{
                            dark: false,
                            colors: {
                                text: "white"
                            },
                        }}
                        color="white"
                        status={checked2? "checked" : "unchecked"}
                        onPress={() => {
                            clear();
                            setEnabled(checked2);
                            setChecked2(!checked2)
                            navigation.navigate("FormScreenTwo");
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'FormScreenTwo'}],
                              });
                        }}
                    /> 
                </View>
                <TouchableOpacity onPress={() => {
                         clear();
                         setEnabled(checked2);
                         setChecked2(!checked2)
                         navigation.navigate("FormScreenTwo");
                         navigation.reset({
                             index: 0,
                             routes: [{name: 'FormScreenTwo'}],
                           });
                }}>
                    <Text style={Styles.checkbox_text}>en un restaurante</Text>
                </TouchableOpacity>            
                </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"
                
                    status={checked3? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setEnabled(checked3);
                        setChecked3(!checked3);
                        navigation.navigate("FormScreenTwo");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenTwo'}],
                          });
                    }}
                /> 
                <TouchableOpacity onPress={() => {
                        clear();
                        setEnabled(checked3);
                        setChecked3(!checked3);
                        navigation.navigate("FormScreenTwo");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenTwo'}],
                          });
                }}>
                    <Text style={Styles.checkbox_text}>en un bar</Text>
                </TouchableOpacity>  
            </View>
            <View style={[Styles.option_button_container, {opacity: enabled? .8 : 1}]}>     
            </View>
            </View>
            </View>
            
        </LinearGradient>
    )
}

export function FormScreenTwo({ navigation, route }: any) {
    const [text, setText] = useState('');
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const { setVideo, setCurrentPattern, default_increment } = useContext(patternContext);
    const [enabled, setEnabled] = React.useState(true);


    const clear = () => {
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        setChecked4(false);
   
    
    }
    const transAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.spring(
            transAnim,
            {
                toValue: 0,
                useNativeDriver: true
            }
        ).start();
        const backAction = () => {
            Alert.alert("¡ Espera!", "Perderas todo tu progreso, ¿deseas volver al inicio?", [
              {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel"
              },
              {
                text: "Si",
                onPress: () => {
                    navigation.navigate("Home")
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                    });
                }
              }
            ]);
            return true;
          }
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
          let timeout = setTimeout(() => {
            navigation.navigate("Home");
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
        }, 300000);
          return () => {
              backHandler.remove();
              clearTimeout(timeout);
            }

    }, [])

    return (
        <LinearGradient
        colors={['rgb(169,83,32)', 'rgb(232,162,48)']}

        style={Styles.container}>
                   <View style={Styles.image_container}>
                <Image resizeMode="contain" style={Styles.cut3} source={require("../assets/img/cut1.png")} />
            </View>
            <Animated.View style={[Styles.bannerSide]} >
                <ImageBackground style={[Styles.leftImage, {flex: 1, padding: 20}]} source={Images.walker2} >
                    <Text style={[Styles.imageTitle, {color: "#78acda"}]}>{"  "}tu{"\n"}highball{"\n  "}preferido</Text>
                    <Text style={[Styles.subTitleImage, {color: "#78acda"}]}>descubramos juntos tu perfil de sabor, empieza respondiendo estas{"\n"}preguntas simples</Text>
                    <Image style={{width: 1000, height: 400, position: "absolute", bottom: 0, right: -500}} resizeMode="contain" source={require("../assets/copy_white.png")} /> 

                </ImageBackground>
            </Animated.View>
            <View style={Styles.formSide}>
            <Text style={Styles.number_indicator}>pregunta 2/3</Text> 
            <View style={{flex: 1, padding: 40}}>           
            <Text style={Styles.title_heading}>tu sabor{"\n"}preferido</Text>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"
                    status={checked1? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setVideo("second");
                        setText("second");
                        setCurrentPattern([6, 7, 4, 5, 8]);
                        default_increment(0.7 / 4);
                        setChecked1(!checked1)
                        setEnabled(checked1);
                        navigation.navigate("FormScreenThree");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenThree'}],
                          });
                    }}
                /> 
                      <TouchableOpacity onPress={() => {
                         clear();
                         setVideo("second");
                         setText("second");
                         setCurrentPattern([6, 7, 4,5, 8]);
                         default_increment(0.7 / 4);
                         setChecked1(!checked1)
                         setEnabled(checked1);
                         navigation.navigate("FormScreenThree");
                         navigation.reset({
                             index: 0,
                             routes: [{name: 'FormScreenThree'}],
                           });
                }}>
                <Text style={Styles.checkbox_text}>dulce</Text>
                </TouchableOpacity>   
            </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"

                    status={checked2? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setVideo("third");
                        setText("third");
                        setCurrentPattern([6, 7, 2, 3, 1]);
                        default_increment(0.7 / 4);
                        setChecked2(!checked2)
                        setEnabled(checked2);
                        navigation.navigate("FormScreenThree");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenThree'}],
                          });
                    }}
                /> 
                       <TouchableOpacity onPress={() => {
                        clear();
                        setVideo("third");
                        setText("third");
                        setCurrentPattern([6, 7, 2, 3, 1]);
                        default_increment(0.7 / 4);
                        setChecked2(!checked2)
                        setEnabled(checked2);
                        navigation.navigate("FormScreenThree");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenThree'}],
                          });
                }}>
                <Text style={Styles.checkbox_text}>cítrico</Text>
                </TouchableOpacity>   
            </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"

                    status={checked3? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setVideo("fourth");
                        setText("fourth");
                        setCurrentPattern([6, 7, 4,1]);
                        default_increment(0.7 / 3);
                        setChecked3(!checked3);
                        setEnabled(checked3);
                        navigation.navigate("FormScreenThree");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenThree'}],
                          });

                    }}
                /> 
                <TouchableOpacity onPress={() => {
                        clear();
                        setVideo("fourth");
                        setText("fourth");
                        setCurrentPattern([6, 7, 4,1]);
                        default_increment(0.7 / 3);
                        setChecked3(!checked3);
                        setEnabled(checked3);
                        navigation.navigate("FormScreenThree");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenThree'}],
                          });

                }}>
                <Text style={Styles.checkbox_text}>picante</Text>
                </TouchableOpacity>  
            </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"

                    status={checked4? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setVideo("first");
                        setText("first");
                        setCurrentPattern([6, 7, 3, 1]);
                        default_increment(0.7 / 3);
                        setChecked4(!checked4);
                        setEnabled(checked4);
                        navigation.navigate("FormScreenThree");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'FormScreenThree'}],
                          });
                
                    }}
                /> 
                <TouchableOpacity onPress={() => {
                    clear();
                    setVideo("first");
                    setText("first");
                    setCurrentPattern([6, 7, 3, 1]);
                    default_increment(0.7 / 3);
                    setChecked4(!checked4);
                    setEnabled(checked4);   
                    navigation.navigate("FormScreenThree");
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'FormScreenThree'}],
                      });
                
                }}>
                <Text style={Styles.checkbox_text}>herbal</Text>
                </TouchableOpacity>  
            </View>
            <View style={[Styles.option_button_container, {opacity: enabled? .8 : 1}]}>       
            </View>

            </View>
            </View>
         
        </LinearGradient>
    )
}

export function FormScreenThree({ navigation, route }: any) {
    const [text, setText] = useState('');
    const { setVideo, setCurrentPattern } = useContext(patternContext);
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);

    const clear = () => {
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        setChecked4(false);
    }

    const transAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.spring(
            transAnim,
            {
                toValue: 0,
                useNativeDriver: true
            }
        ).start();
        const backAction = () => {
            Alert.alert("¡ Espera!", "Perderas todo tu progreso, ¿deseas volver al inicio?", [
              {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel"
              },
              {
                text: "Si",
                onPress: () => {
                    navigation.navigate("Home")
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                    });
                }
              }
            ]);
            return true;
          }
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
          let timeout = setTimeout(() => {
            navigation.navigate("Home");
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
        }, 300000);
          return () => {
              backHandler.remove();
              clearTimeout(timeout);
            }

    }, [])

   
    return (
        <LinearGradient
        colors={['rgb(169,83,32)', 'rgb(232,162,48)']}

        style={Styles.container}>
                   <View style={Styles.image_container}>
                <Image resizeMode="contain" style={Styles.cut3} source={require("../assets/img/cut1.png")} />
            </View>
            <Animated.View style={[Styles.bannerSide]} >
            <ImageBackground style={[Styles.leftImage, {flex: 1, padding: 20}]} source={Images.walker3} >
                    <Text style={[Styles.imageTitle, {color: "#d39558"}]}>{"  "}tu{"\n"}highball{"\n  "}preferido</Text>
                    <Text style={[Styles.subTitleImage, {color: "#d39558"}]}>descubramos juntos tu perfil de sabor, empieza respondiendo estas{"\n"}preguntas simples</Text>
                    <Image style={{width: 1000, height: 400, position: "absolute", bottom: 0, right: -500}} resizeMode="contain" source={require("../assets/copy_white.png")} /> 

                </ImageBackground>
            </Animated.View>
            <View style={Styles.formSide}>
            <Text style={Styles.number_indicator}>pregunta 3/3</Text> 
            <View style={{flex: 1, padding: 40}}>           
            <Text style={Styles.title_heading}>tu compañía preferida</Text>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"
                    status={checked1? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setChecked1(!checked1)
                        setEnabled(checked1);
                        navigation.navigate("Video");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Video'}],
                          });
                    }}
                /> 
                <TouchableOpacity onPress={() => {
                    clear();
                    setChecked1(!checked1)
                    setEnabled(checked1);
                    navigation.navigate("Video");
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Video'}],
                      });
                }}>
                    <Text style={Styles.checkbox_text}>amigos</Text>
                </TouchableOpacity>
            </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"

                    status={checked2? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setChecked2(!checked2)
                        setEnabled(checked2);
                        navigation.navigate("Video");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Video'}],
                          });
                    }}
                /> 
                <TouchableOpacity onPress={() => {
                      clear();
                      setChecked2(!checked2)
                      setEnabled(checked2);
                      navigation.navigate("Video");
                      navigation.reset({
                          index: 0,
                          routes: [{name: 'Video'}],
                        });
                }}>
                    <Text style={Styles.checkbox_text}>familia</Text>
                </TouchableOpacity>
            </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"

                    status={checked3? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setChecked3(!checked3);
                        setEnabled(checked3);
                        navigation.navigate("Video");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Video'}],
                          });
                    }}
                /> 
                <TouchableOpacity onPress={() => {
                      clear();
                      setChecked3(!checked3);
                      setEnabled(checked3);
                      navigation.navigate("Video");
                      navigation.reset({
                          index: 0,
                          routes: [{name: 'Video'}],
                        });
                }}>
                <Text style={Styles.checkbox_text}>pareja</Text>
                </TouchableOpacity>
            </View>
            <View style={[Styles.checkbox, {transform: [{scale: 1.5}]}]}>
                <Checkbox 
                    theme={{
                        dark: false,
                        colors: {
                            text: "white"
                        }
                    }}
                    color="white"

                    status={checked4? "checked" : "unchecked"}
                    onPress={() => {
                        clear();
                        setChecked4(!checked4);
                        setEnabled(checked4);
                        navigation.navigate("Video");
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'Video'}],
                          });
                    }}
                /> 
                <TouchableOpacity onPress={() => {
                    clear();
                    setChecked4(!checked4);
                    setEnabled(checked4);
                    navigation.navigate("Video");
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Video'}],
                      });
                }}>
                    <Text style={Styles.checkbox_text}>todos los anteriores</Text>
                </TouchableOpacity>
            </View>
            <View style={[Styles.option_button_container, {opacity: enabled? .8 : 1}]}>    
            </View>
            </View>
            </View>
        </LinearGradient>    )
}

const Styles = StyleSheet.create({
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 55,
        paddingTop: 10
    },
    checkbox_text: {
        color: "rgb(253,230,112)",
        fontFamily: "Johnnie-Head",
        textTransform: "uppercase",
        fontSize: 18    
    },
    container: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
    },
    buttonControls: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    main_title: {
        display: "flex",
        fontSize: 25
    },
    title_heading: {
        fontSize: 60,
        paddingVertical: 10,
        paddingTop: 20,
        fontFamily: "Johnnie-Head",
        color: "white",
        textTransform: "uppercase",
        lineHeight: 50
    },
    item: {
        marginBottom: 10,
        fontFamily: "Poppins-Regular"
    },
    bannerSide: {
        backgroundColor: "white",
        flex: .5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24
    },
    formSide: {
        flex: 1 / 2,
        padding: 20,
    },   
    button_style: {
        padding: 10,
        backgroundColor: "white",
        width: 180,
        textAlign: "center",
        fontSize: 30,
        fontFamily: "Johnnie-Head",
        marginVertical: 10,
        borderRadius: 5,
        textTransform: "uppercase",
        color: "rgb(251,186,61)"
    },
    option_button_container: {
        flex: 1,
        alignItems:"center"
    },
    number_indicator: {
        fontSize: 28,
        fontFamily: "Johnnie-Regular",
        color: "white",
        textTransform: "uppercase",
        textAlign: "right",
        paddingTop: 10,
        paddingRight: 20
    },
    imageTitle: {
        fontFamily: "Johnnie-Head",
        fontSize: 70,
        paddingLeft: 50,
        paddingTop: 10,
        lineHeight: 60
    },  
    subTitleImage: {
        fontFamily: "Johnnie-Head",
        fontSize: 30,
        paddingLeft: 160,
        paddingTop: 40,
        lineHeight: 30

    }, 
    leftImage: {
        paddingTop: 80
    },
    image_container: {
        position: "absolute",
        right: -92,
        top: 250
    },
    cut3: {
    width: 300,
    height: 300
    }

})
