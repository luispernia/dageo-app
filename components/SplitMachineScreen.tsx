import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  BackHandler,
  Alert,
} from "react-native";
import SplideGame from "./SplideGame";
import patternContext from "../services/context/PatternContext";
import { Audio } from "expo-av";

function SplitMachineScreen(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transX = useRef(new Animated.Value(0)).current;
  const [johnnieState, setJohnnie] = useState("");
  const { johnnie, setCurrentPattern, setVideo, default_increment } =
    useContext(patternContext);
  const titleAnim = useRef(new Animated.Value(300)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/jackpot.mp3")
    );
    setSound(sound);
  
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    playSound();
    let timeout = setTimeout(() => {
      props.navigation.navigate("Home");
      props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
  }, 300000);
    return () => {
        clearTimeout(timeout);
      }
  }, []);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(transX, {
      toValue: 1200,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (johnnie) {
      switch (johnnie) {
        case "green tea":
          setVideo("first");
          setCurrentPattern([6, 7, 3, 1]);
          default_increment(0.7 / 3);

          break;
        case "peach":
          setVideo("second");
          setCurrentPattern([6, 7, 4,5, 8]);
          default_increment(0.7 / 4); 

          break;
        case "lemon":
          setVideo("third");
          setCurrentPattern([6, 7, 2, 3, 1]);
          default_increment(0.7 / 4);
          break;

        case "ginger":
          setVideo("fourth");
          setCurrentPattern([6, 7, 4,1]);
          default_increment(0.7 / 3);

          break;

        default:
          break;
      }
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.exp),
      }).start();
    }
  }, [johnnie]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "¡ Espera!",
        "Perderas todo tu progreso, ¿deseas volver al inicio?",
        [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Si",
            onPress: () => {
              props.navigation.navigate("Home");
              props.navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            },
          },
        ]
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  return (
    <SplideGame
      johnnie={johnnie}
      nav={props.navigation}
      textFade={textAnim}
      anim={titleAnim}
    />
  );
}

const Styles = StyleSheet.create({
  imgStyle: {
    flex: 1,
    width: 30,
  },
  anim_container: {
    flex: 1,
  },
  box_1: {
    backgroundColor: "red",
    flex: 0.33,
    flexDirection: "row",
  },
  box_2: {
    backgroundColor: "purple",
    flex: 0.33,
  },
  box_3: {
    backgroundColor: "cyan",
    flex: 0.33,
  },
});

export default SplitMachineScreen;
