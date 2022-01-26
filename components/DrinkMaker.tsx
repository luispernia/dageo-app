import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  Image,
  BackHandler,
  Alert,
  PanResponder,
} from "react-native";
import Draggable from "./Draggable";
import { Button as ButtonPaper } from "react-native-paper";
import patternContext from "../services/context/PatternContext";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

function DrinkMaker({ navigation, route }) {
  const { pattern, currentPattern } = useContext(patternContext);
  const [tries, setTries] = useState();
  const [modal, setModal] = useState();
  const [shows, setShows] = useState();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(-200)).current;
  const titleOpac = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const modalOpac = useRef(new Animated.Value(0)).current;

  const [display, setDisplay] = useState("none");
  const [widthA, setWidth] = useState(0);
  const [heightA, setHeight] = useState(0);

  useEffect(() => {
    if (tries) {
      setHeight(height);
      setWidth(1010);
      setDisplay("flex");
      Animated.timing(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }).start();
      Animated.spring(titleAnim, {
        toValue: 60,
        useNativeDriver: true,
      }).start();
      Animated.timing(titleOpac, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [tries]);

  useEffect(() => {
    if (modal) {
      setTimeout(() => {
        setShows(true);
        setHeight(height);
        setWidth(1010);
        setDisplay("flex");
        Animated.timing(modalAnim, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }).start();
        Animated.timing(modalOpac, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }).start();
      }, 1000);
    }
  }, [modal]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "¡Espera!",
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
              navigation.navigate("Home");
              navigation.reset({
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
    let timeout = setTimeout(() => {
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 300000);
    return () => {
      clearTimeout(timeout);
      backHandler.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      {shows && modal ? (
        <Animated.View
          style={[
            styles.modal, 
            { opacity: modalOpac },
            { width: widthA },
            { height: heightA },
          ]}
        >
          <Animated.View>
            <Animated.Text
              style={[styles.modalHeading, { opacity: modalOpac }]}
            >
              ¡Lo Lograste!
            </Animated.Text>
            <Animated.Text style={[styles.smallModal, { opacity: modalOpac }]}>
              haz clic aquí y verifica si{"\n"}eres uno de los ganadores{"\n"} de
              nuestro golden ticket
            </Animated.Text>
            <TouchableOpacity
              onPress={() => {
                const possiblities = [0,0,0,0,0,0,0,1,1];
                if(possiblities[Math.floor(Math.random() * possiblities.length)] == 1) {
                    navigation.navigate("Complete");
                    navigation.reset({
                    index: 0,
                    routes: [{name: 'Complete'}],
                    });
                } else {
                    setTries(true);
                    setShows(false);
                }             
              }}
              style={[styles.overflow]}
            >
              <Animated.Text
                style={[styles.button_style, { opacity: modalOpac }]}
              >
                prueba tu suerte
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      ) : (
        <></>
      )}

      {tries ? (
        <Animated.View
          style={[
            styles.alert,
            { width: widthA },
            { height: heightA },
            { opacity: fadeAnim },
            { display: display },
          ]}
        >
          <LinearGradient
            colors={["#874300", "#ffb709"]}
            style={styles.text_container}
          >
            <View style={{ transform: [{ translateX: 50 }] }}>
              <Image
                style={{
                  position: "absolute",
                  top: -175,
                  right: 100,
                  width: 400,
                  height: 250,
                  transform: [{ translateY: 100 }],
                }}
                resizeMode="contain"
                source={require("../assets/walkerLogo.png")}
              />
              <Animated.Text
                style={[styles.small_heading, { opacity: titleOpac }]}
              >
                Sigue Intentando
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.main_heading,
                  { opacity: titleOpac },
                  { transform: [{ translateX: titleAnim }] },
                ]}
              >
                Gracias {"\n"}por{"\n"}participar
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.hashtag_heading,
                  { opacity: titleOpac, paddingBottom: 20 },
                ]}
              >
                #keepwalking
              </Animated.Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: "#ffb709",
                paddingTop: 40,
              }}
            >
              <Text style={styles.qr_text}>
                para conocer todas las{"\n"}recetas de nuestros highballs
                escanea el código qr
              </Text>
              <Image
                style={styles.qr_image}
                source={require("../assets/img/qr-code.png")}
              />
            </View>
          </LinearGradient>
          <ImageBackground
            imageStyle={{ height: 600 }}
            resizeMode="cover"
            source={require("../assets/thanks.png")}
            style={styles.image_container}
          >
            <Image
              style={{
                position: "absolute",
                left: -50,
                width: 300,
                height: 300,
                transform: [{ translateY: 100 }],
              }}
              resizeMode="contain"
              source={require("../assets/golden_tiny.png")}
            />
            {/* <Image style={{position: "absolute", left: 187, width: 500, height:500, transform: [{translateY: -120}]}} resizeMode="contain" source={require("../assets/side.png")} /> */}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
              style={{ transform: [{ translateY: 0 }] }}
            >
              <Text style={styles.button_style}>Volver al inicio</Text>
            </TouchableOpacity>
          </ImageBackground>
        </Animated.View>
      ) : (
        <></>
      )}

      <View style={styles.wrapper}>
        <Draggable
          modal={setModal}
          tries={setTries}
          pattern={currentPattern}
          nav={navigation}
        ></Draggable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overflow: {
    transform: [{ translateX: 400 }],
  },
  modal: {
    backgroundColor: "#0000008c",
    position: "absolute",
    zIndex: 99999999999999999999,
    right: 0,
    left: 0,
    flex: 1,
  },
  blackBox: {
    backgroundColor: "black",
    padding: 30,
  },
  wrapper: {
    flex: 1,
  },
  alert: {
    flex: 1,
    backgroundColor: "#030303c9",
    position: "absolute",
    zIndex: 9999999,
    right: 0,
    left: 0,
    flexDirection: "row",
  },
  super: {
    flex: 1,
    color: "white",
  },
  small_heading: {
    color: "white",
    fontFamily: "Johnnie-Head",
    fontSize: 30,
    transform: [{ translateX: 15 }],
  },
  smallModal: {
    fontFamily: "Johnnie-Head",
    fontSize: 30,
    paddingTop: 60,
    textAlign: "center",
    color: "#ffec7c", 
  },
  main_heading: {
    color: "white",
    fontFamily: "Johnnie-Head",
    fontSize: 55,
    paddingLeft: 20,
    lineHeight: 49,
    paddingTop: 20,
    transform: [{ translateX: 60 }],
  },
  modalHeading: {
    color: "white",
    fontFamily: "Johnnie-Head",
    fontSize: 80,
    lineHeight: 49,
    paddingTop: 130,
    textAlign: "center",
  },
  hashtag_heading: {
    color: "rgb(254,237,122)",
    fontFamily: "Johnnie-Head",
    fontSize: 40,
    paddingLeft: 80,
    transform: [{ translateX: 40 }],
    marginBottom: 10,
  },
  text_container: {
    padding: 30,
    paddingTop: 100,
    flex: 0.5,
    height: 600,
  },
  image_container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  qr_text: {
    fontFamily: "Johnnie-Head",
    fontSize: 24,
    color: "white",
    maxWidth: 300,
    paddingRight: 40,
    paddingLeft: 40,
  },
  qr_image: {
    width: 100,
    height: 100,
    marginLeft: 30,
  },
  brand_text: {
    fontFamily: "Johnnie-Regular",
    color: "white",
    fontSize: 30,
    textTransform: "uppercase",
  },
  button_style: {
    padding: 10,
    backgroundColor: "#fdf8e6",
    width: 210,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Johnnie-Head",
    marginVertical: 10,
    borderRadius: 5,
    textTransform: "uppercase",
    color: "#fdb913",
  },
});

export default DrinkMaker;
