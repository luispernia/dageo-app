import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator, BackHandler, Alert, Image } from "react-native";
import { Video } from 'expo-av';
import { Button as ButtonPaper } from "react-native-paper";
import { useContext } from 'react';
import patternContext from '../services/context/PatternContext';

const { height, width } = Dimensions.get("window");

function VideoScreen({ navigation }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [color, setColor] = useState();
  const [text, setText] = useState();
  const [pattern, setPattern] = useState([]);
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState();

  const { resetPattern, resetValue, videoPath, setVideo } = useContext(patternContext);

  useEffect(() => {
    video.current.playAsync();
    switch (videoPath) {
      case 'first':
        setColor("#7b947e");
        setText("green tea");
        setDescription("una combinación refrescante y herbal. explora y descubre nuevas sensaciones en tu paladar");
        setPattern(["hielo hasta el tope del vaso", "45ml johnnie walker black label", "completa con té verde dulce", "decora con hoja de piña o pepino", "usa un vaso largo o highball"]);
        break;
      case 'second':
        setColor("#c79361");
        setText("peach");
        setDescription("despierta tus sentidos saboreando una explosión entre el dulzor y las especias");
        setPattern(["hielo hasta el tope del vaso", "45ml johnnie walker black label",  "completa con té de durazno dulce","50ml de soda", "decora con rodaja de limón o durazno","usa un vaso largo o highball"]);
        break;
      case 'third':
        setColor("rgb(119,172,218)");
        setText("lemon");
        setDescription("deliciosa fusión de sabores que dejará una fresca sensación en tu paladar");
        setPattern(["hielo hasta el tope del vaso", "45ml johnnie walker black label", "completa con limonada hecha en casa", "decora con Cáscara de limón y hierbabuena", "usa un vaso largo o highball"]);
        break;
      case 'fourth':
        setColor("#d48592");
        setText("ginger");
        setDescription("unión entre el fuego y las especias, enciende tu paladar con cada sorbo de esta mezcla  ");
        setPattern(["hielo hasta el tope del vaso", "45ml johnnie walker black label", "completa con ginger ale", "decora con una rodaja de naranja", "usa un vaso largo o highball"]);
        break;

      default:
        break;
      }
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
    <View style={Styles.view}>
      
      <Image style={Styles.walker_words} resizeMode="contain" source={require("../assets/walker_words.png")} />
      <View style={Styles.info_view}>

        <Text style={[Styles.headTitle, {color: color}]}>Tu highball ideal es:</Text>
        <Text style={[Styles.mainTitle, {color: color}]}>JOHNNIE{'\n'}&{text}</Text>
        <Text style={[Styles.description, {color: color}]}>{description}</Text>
        {pattern.map((val, key) => {
            return <Text key={key} style={[Styles.list_item]}>• {" "}{val}</Text>
        })}
        
        <Text style={[Styles.description,Styles.advertise]}>¿estás listo para ponerte a prueba?</Text>
        <View style={[Styles.option_button_container, {flexDirection: "row", justifyContent: "center"}]}>
          <TouchableOpacity onPress={() => {
                setLoading(true);
                resetValue();
                resetPattern();
                setTimeout(() => {
                  video.current.pauseAsync();
                  navigation.navigate('DrinkMaker', { video: video });
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'DrinkMaker'}],
                  });
                  console.log("we");

                }, 1);
            }}>
                <Text style={[Styles.button_style, {color: "white", marginRight: 5}]}>clic para preparar</Text>
          </TouchableOpacity>  
          {
            loading? 
            (
              <ActivityIndicator size="large" color={color}/>
            ) : 
            (
              <View />
              
            )
          }
          
        </View>
      </View>
      <View style={Styles.video_view}>
      <Image style={{width: 1000, height: 350, position: "absolute", bottom: -8, right: 0, zIndex: 99}} resizeMode="contain" source={require("../assets/copy_black.png")} /> 


        {videoPath == "first" ? (
          <Video
            ref={video}
            style={Styles.video}
            source={require(`../assets/video/greenTea.mp4`)}

            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />

        ) : videoPath === "second" ? (
          <Video
            ref={video}
            style={Styles.video}
            source={require(`../assets/video/peach.mp4`)}

            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        ) : videoPath === "third" ? (
          <Video
            ref={video}
            style={Styles.video}
            source={require(`../assets/video/lemon.mp4`)}

            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        ) : (
          <Video
            ref={video}
            style={Styles.video}
            source={require(`../assets/video/ginger.mp4`)} // ginger

            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        )}
      </View >

    </View>
  )
}

const Styles = StyleSheet.create({
  walker_words: {
    width: 500,
    height: 300,
    position: "absolute",
    top: -102,
    left: 80,
    zIndex:999999999999999999999 
  },
  video: {
    height: 550,
    width: 430,

  },
  title: {
    padding: 20,
    fontSize: 20,
    paddingTop: 40,
    fontFamily: "Poppins-Bold"
  },
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(252,245,226)",
    flex: 1,
  },
  video_view: {
    justifyContent: "center",
    backgroundColor: "rgb(252,245,226)"

  },
  button: {
    backgroundColor: "blue",
    transform: [{ translateY: 20 }, { translateX: 20 }]
  },
  headTitle: {
    fontFamily: "Johnnie-Head",
    fontSize: 30,
    paddingLeft: 30,
    paddingTop: 60,
    paddingBottom: 10,
    color: "rgb(124,173,216)"
  },
  mainTitle: {
    fontFamily: "Johnnie-Head",
    fontSize: 60,
    paddingLeft: 30,
    lineHeight: 60,
    color: "rgb(124,173,216)"
  },
  description: {
    fontFamily: "Johnnie-Head",
    fontSize: 22,
    paddingTop: 10,
    paddingLeft: 30,
    maxWidth: 500,
    color: "rgb(124,173,216)",
    paddingBottom: 10
  },
  list_item: {
    paddingLeft: 30,
    paddingTop:5,
    fontFamily: "Johnnie-Head",
    fontSize: 16,
    color: "black"
  },
  info_view: {
    backgroundColor: "rgb(252,245,226)",
    transform: [{translateX: 50}]
  },
  option_button_container: {
    flex: 1,
    alignItems: "center",
    transform: [{translateY: -10}, {translateX: -100}]
},
button_style: {
  padding: 10,
  backgroundColor: "black",
  width: 210  ,
  textAlign: "center",
  fontSize: 30,
  fontFamily: "Johnnie-Head",
  marginVertical: 10,
  borderRadius: 5,
  textTransform: "uppercase",
  color: "rgb(251,186,61)"
},
advertise: {
  color: "black",
  paddingBottom: 0,
  fontSize: 22
}
})

export default VideoScreen
