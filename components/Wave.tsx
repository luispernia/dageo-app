import React from "react";
import {View, Dimensions, StyleSheet} from "react-native";
import AnimatedWave from "react-native-animated-wave";
import { ArtTest } from "react-native-art-wave";
import LiquidProgress from "react-native-liquid-progress";


var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
const Wave = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
 <View style={{flex:1}}>

    <LiquidProgress
    backgroundColor={"black"}
    frontWaveColor={"blue"}
    backWaveColor={"skyblue"}
    fill={.5}
    size={800}
    ></LiquidProgress>
    <View style={Styles.glassStick1} />
    <View style={Styles.glassStick2} />
    <View style={Styles.bottom} />
    <View style={Styles.borrow} />
    </View>
    </View>
  )
}

const Styles = StyleSheet.create({
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
}
})

export default Wave;