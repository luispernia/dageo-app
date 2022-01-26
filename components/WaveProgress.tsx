import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Text, Easing, Image } from "react-native";
import LiquidProgress from "react-native-liquid-progress";
import { useContext } from "react";
import patternContext from "../services/context/PatternContext";
import Wave from "./Wave";

function WaveProgress(props) {
  const { value, currentPattern, increment, videoPath } =
    useContext(patternContext);
  const animRef = useRef(new Animated.Value(0)).current;
  const number = useRef(new Animated.Value(1)).current;
  const numberOpac = useRef(new Animated.Value(0)).current;
  const defaultOpac = useRef(new Animated.Value(1)).current;
  const [highball, setHighball] = useState("");

  useEffect(() => {
    switch (videoPath) {
      case "first":
        setHighball("green tea");

        break;
      case "second":
        setHighball("peach");

        break;
      case "third":
        setHighball("lemon");

        break;
      case "fourth":
        setHighball("ginger");

        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    Animated.spring(animRef, {
      toValue: value,
      tension: 0,
      useNativeDriver: false,
    }).start();
    return () => {};
  }, [value]);

  useEffect(() => {
    if (props.repeats != 0) {
      Animated.timing(number, {
        toValue: 4,
        duration: 500,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }).start();
      Animated.timing(numberOpac, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
      Animated.timing(defaultOpac, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(number, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start();
        Animated.timing(numberOpac, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start();
        Animated.timing(defaultOpac, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, 700);
    }
    return () => {};
  }, [props.repeats]);

  return (
    <View style={styles.container}>
        <Animated.Text style={[styles.wave_sub_text, {opacity: props.boom}]}>
          arrastra al vaso los ingredientes en el orden correcto para preparar tu
          johnnie&{highball}
        </Animated.Text>
        <Animated.Text style={[styles.wave_text, {opacity: props.boom}]}>¡PONGÁMOSLO EN PRÁCTICA!</Animated.Text>
        {/* <Animated.Text style={[styles.wave_text, {textAlign: "center", opacity: props.win}]}>completaste el highball{"\n"}johnnie&{highball}</Animated.Text> */}
        <Animated.Image 
          style={
            [{position: "absolute", 
            left:
            highball == "green tea"? 
            345 :
            highball == "peach"? 
            320 : 
            highball == "lemon"? 
            290 :
            285
,
            zIndex:
            highball == "green tea"? 
            -1 :
            highball == "peach"? 
            -1 : 
            highball == "lemon"? 
            999 :
            999

,           transform: 
            [{translateY:
              highball == "green tea"? 
              60 :
              highball == "peach"? 
              80 : 
              highball == "lemon"? 
              9 :
              0
            }]
,            width: 180, height: 180, opacity: props.show}]
          }
          resizeMode="contain" 
          source={
              highball == "green tea"? 
              require("../assets/pineapple.png") :
              highball == "peach"? 
              require("../assets/rodaja.png") :
              highball == "lemon"? 
              require("../assets/naranja.png") :
              require("../assets/tea.png") 


          }/>
      <View style={[styles.glass_style]}>
        <LiquidProgress
          backgroundColor={"transparent"}
          frontWaveColor={"#F9C140"}
          backWaveColor={"#c18d2d"}
          fill={props.val}
          size={500}
        ></LiquidProgress>
        <Text style={styles.missing}>Intentos:</Text>
        <Animated.Text
          style={[
            styles.number_counter,
            { color: "#de2f58" },
            { opacity: numberOpac },
            { right: 15 },
            { transform: [{ scale: number }] },
          ]}
        >
          {3 - props.repeats}
        </Animated.Text>
        <Animated.Text
          style={[styles.number_counter, { opacity: defaultOpac }]}
        >
          {3 - props.repeats}
        </Animated.Text>

        {/* <View style={styles.drag_container}>
              <View style={styles.glass_animated}>
                  <Animated.View style={[styles.inner_anim, {paddingTop: animRef }]}>
                  </Animated.View>
              </View>
          </View> */}
        {/* <View style={styles.left} /> */}
        {/* <View style={styles.right} /> */}
        <View style={styles.glassStick1} />
        <View style={styles.glassStick2} />
        <View style={styles.borrow1} />
        <View style={styles.borrow2} />
        <View style={styles.bottom} />
        <Animated.View
          style={[
            styles.iceCube,
            { opacity: props.ice },
            {
              transform: [
                { translateX: -40 },
                { translateY: 40 },
                { rotate: "10deg" },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.iceCube,
            { opacity: props.ice },
            {
              transform: [
                { translateX: 40 },
                { translateY: 90 },
                { rotate: "10deg" },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.iceCube,
            { opacity: props.ice },
            {
              transform: [
                { translateX: -35 },
                { translateY: 160 },
                { rotate: "20deg" },
              ],
            },
          ]}
        >
          <Text>{props.pattern}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.iceCube,
            { opacity: props.ice },
            {
              transform: [
                { translateX: 17 },
                { translateY: 240 },
                { rotate: "60deg" },
              ],
            },
          ]}
        />
        <Animated.View style={[styles.walkerLogo, { opacity: props.walker }]}>
          <Image
            resizeMode="contain"
            style={styles.img_container}
            source={require("../assets/walker.png")}
          />
        </Animated.View>
        <View
          style={[
            styles.bottom,
            {
              zIndex: 0,
              backgroundColor: "#E69F30",
              right: -60,
              width: 200,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img_container: {
    width: 130,
    height: 130,
  },
  walkerLogo: {
    width: 300,
    height: 300,
    position: "absolute",
    top: 50,
    left: -18,  
    zIndex: -1,
  },
  iceCube: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "white",
    position: "absolute",
    zIndex: -1,
  },
  left: {
    width: 30,
    height: 30,
    position: "absolute",
    backgroundColor: "white",
  },
  right: {
    width: 30,
    height: 500,
    position: "absolute",
    backgroundColor: "yellow",
    right: 190,
  },
  glass_animated: {
    width: 200,
    height: 300,
    backgroundColor: "white",
    justifyContent: "flex-end",
    borderRadius: 20,
  },
  drag_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: 200,
  },
  glass_style: {
    position: "absolute",
    top: 155,
    maxWidth: 100,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  wave_text: {
    position: "absolute",
    fontSize: 44,
    bottom: 60,
    fontFamily: "Johnnie-Head",
    color: "white",
  },
  wave_sub_text: {
    paddingBottom: 0,
    fontSize: 30,
    fontFamily: "Johnnie-Head",
    color: "#feea6c",
    maxWidth: 470,
    textAlign: "center",
    textTransform: "uppercase",
    transform: [{translateY: -80}],
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: 40 }],
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    height: 70,
  },
  text: {
    color: "white",
    fontSize: 47,
  },
  buttonLayer: { flex: 0.25, flexDirection: "row" },
  button: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 30,
    elevation: 10,
  },
  buttonText: { fontSize: 15, color: "white" },
  title: { fontSize: 40, flex: 0.5, color: "gray" },
  glassStick1: {
    width: 6,
    height: 330,
    right: 140,
    top: 12,
    backgroundColor: "white",
    position: "absolute",
    transform: [{ skewY: "-8 deg" }],
    borderBottomLeftRadius: 10,
    zIndex: 999999999,
  },
  glassStick2: {
    width: 6,
    height: 330,
    position: "absolute",
    right: -41,
    top: 12,
    backgroundColor: "white",
    transform: [{ skewY: "8deg" }],
    borderBottomRightRadius: 10,
    zIndex: 999,
  },
  bottom: {
    width: 140,
    height: 8,
    top: 335,
    right: -18,
    position: "absolute",
    backgroundColor: "white",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    zIndex: 999,
  },
  borrow1: {
    height: 350,
    width: 130,
    right: -173,
    // right: 0,
    transform: [{ skewY: "8deg" }],
    position: "absolute",
    backgroundColor: "#E69F30",
  },
  borrow2: {
    width: 100,
    height: 350,
    right: 148,
    // right: 0,
    transform: [{ skewY: "-8deg" }],
    position: "absolute",
    backgroundColor: "#E69F30",
  },
  missing: {
    transform: [{ translateY: 25 }],
    fontFamily: "Johnnie-Head",
    fontSize: 20,
    width: 200,
    textAlign: "center",
    color: "white",
    paddingRight: 20,
    position: "absolute",
    bottom: -20,
    right: -50,
  },
  number_counter: {
    fontFamily: "Johnnie-Head",
    color: "white",
    fontSize: 20,
    transform: [{ translateX: 67 }],
    position: "absolute",
    bottom: -46,
    zIndex: 9999999999999999999,
    right: 82,
  },
});

export default WaveProgress;
