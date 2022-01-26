import React from 'react';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Image, PanResponder } from 'react-native';
import ReelSet from './ReelSet';
import { Button } from "react-native"
import JackpotButton from './JackpotButton';
import patternContext from '../services/context/PatternContext';

export default class SplideGame extends React.Component {

  static contextType = patternContext;

  constructor(props) {
    super(props);
    this.reelSet = null;
    this.ref = React.createRef(null);
    this.state = {
      anim: this.props.anim,
      prev: 0,
      opacs: new Animated.Value(1),
      color: "black",
      pan: new Animated.ValueXY({ x: 0, y: 0 }),
      click: false
    }
  }

  opac() {
    Animated.timing(
      this.state.opacs,
      {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.exp)
      }
    ).start()
  }

  UNSAFE_componentWillMount() {
    this.state.pan.addListener((value) => this._val = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderRelease: (e, gesture) => {
        console.log(this.state.click)
        if(!this.state.click) {
        this.setState({
          click: true
        });
        setTimeout(() => {
        const spins = [1, 2, 3, 4];
        let selected = spins[Math.floor(Math.random() * spins.length)];
        switch (selected) {
          case 1:
            this.setState({
              color: "rgb(119,173,219)"
            })
            break;
          case 2:
            this.setState({
              color: "#7b947e"
            })
            break;
          case 3:
            this.setState({
              color: "#d48592"
            })
            break;
          case 4:
            this.setState({
              color: "#c79361"
            })
            break;

          default:
            break;
        }
        this.opac();
        Animated.timing(
          this.props.anim,
          {
            toValue: 200,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.exp)
          }
        ).start(() => {
          this.reelSet.spin(selected);
        })
      }, 1);
          
      }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View {...this.panResponder.panHandlers} style={styles.gameScene}>
          <View style={styles.gameScreen}>
          <Image style={{width: 500, height: 400, position: "absolute", backgroundColor: "transparent", bottom: -15, right: 0, zIndex: 999999999999}} resizeMode="contain" source={require("../assets/copy_black.png")} /> 

            <ReelSet ref={(ref) => {
              this.reelSet = ref;
            }} />
          </View>
          <View style={styles.controlOne}>

            <Animated.View style={[styles.controlOneContainer, { transform: [{ translateX: this.props.anim }] }]}>
              <>
                <Animated.Text style={[styles.highballSubTitle, {opacity: this.state.opacs}]}>tu highball es:</Animated.Text>
                <Animated.Text style={[styles.highballSubTitle, {color: this.state.color} ]}>tu highball es:</Animated.Text>

                <Animated.Text style={[styles.highballTitle, {opacity: this.state.opacs}]}>johnnie{"\n"}&{this.props.johnnie}</Animated.Text>
                <Text style={[styles.highballTitle, {color: this.state.color}]}>johnnie{"\n"}&{this.props.johnnie}</Text>

                <TouchableOpacity onPress={() => {
                  this.props.nav.navigate("Video")
                  this.props.nav.reset({
                    index: 0,
                    routes: [{name: 'Video'}],
                  });
                }} style={[styles.buttonOne, {backgroundColor: "white"}, { opacity: this.props.textFade }]}>
                  <Animated.Text style={[styles.button_text, {color: this.state.color}]}>Continuar</Animated.Text>
                </TouchableOpacity>
              </>
              <Text></Text>
            </Animated.View>
          </View>
        </View>
        <View style={styles.buttonSpin}>
          
          <View style={[styles.buttonContainer, styles.bg_gray]}>

            <Text style={[styles.title_column, { color: this.state.color }]}>hay un highball en tu futuro</Text>
            <Animated.Text style={[styles.title_column, { opacity: this.state.opacs }]}>hay un highball en tu futuro</Animated.Text>

          </View>
          <View style={[styles.buttonContainer, styles.bg_red]}>

            <JackpotButton click={this.state.click} mode="contained" style={styles.button} disabled={true} color={this.state.color} />
             <JackpotButton click={this.state.click} mode="contained" style={styles.button} onPress={() => {
              const spins = [1, 2, 3, 4];
              let selected = spins[Math.floor(Math.random() * spins.length)];
              this.setState({
                click: true
              })
              switch (selected) {
                case 1:
                  this.setState({
                    color: "rgb(119,173,219)"
                  })
                  break;
                case 2:
                  this.setState({
                    color: "#7b947e"
                  })
                  break;
                case 3:
                  this.setState({
                    color: "#d48592"
                  })
                  break;
                case 4:
                  this.setState({
                    color: "#c79361"
                  })
                  break;

                default:
                  break;
              }
              this.opac();
              Animated.timing(
                this.props.anim,
                {
                  toValue: 200,
                  duration: 1000,
                  useNativeDriver: true,
                  easing: Easing.inOut(Easing.exp)
                }
              ).start(() => {
                this.reelSet.spin(selected);
              })
      
            }} color="black" opacity={true} />
            {/* {'// rgb(252,245,226)'} */}
            <View style={{position: "absolute", width:30, height: 600, backgroundColor: "rgb(252,245,226)", right: -27, transform: [{translateY: -321}]}} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonOne: {
    padding: 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 10,
    margin: 20
  },
  button_text: {
    color: "white",
    fontSize: 35,
    fontFamily: "Johnnie-Head",
    textTransform: "uppercase",
    textAlign: "center",
  },
  title_column: {
    fontSize: 62,
    textTransform: 'uppercase',
    fontFamily: 'Johnnie-Head',
    color: '#262626',
    lineHeight: 55,
    position: "absolute",
    paddingLeft: 20,
    paddingTop: 20
  },
  buttonContainer: {
    flex: .5,
    justifyContent: 'center'
  },
  bg_gray: {
    padding: 20
  },
  bg_red: {
    justifyContent: 'flex-start',

  },
  container: {
    backgroundColor: 'rgb(252,245,226)',
    flex: 1,
    flexDirection: 'row-reverse'
  },
  gameScene: {
    flex: .8,
    flexDirection: "row"

  },
  controlOne: {
    flex: .5,
    backgroundColor: "rgb(252,245,226)"
  },
  gameScreen: {
    flex: 1
  },
  buttonSpin: {
    backgroundColor: "rgb(252,245,226)",
    flex: .3,
    justifyContent: "space-between"
  },
  highballTitle: {
    fontSize: 50,
    textAlign: "left",
    paddingTop: 5,
    paddingHorizontal: 20,
    textTransform: "uppercase",
    fontFamily: "Johnnie-Head",
    right: 0,    
    position: "absolute",
    lineHeight: 50
  },
  controlOneContainer: {
    flex: 1,
    justifyContent: "center",
  },
  highballSubTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Johnnie-Head",
    position: "absolute",
    paddingHorizontal: 60,
    transform: [{translateY: -70}],
    right: 15,
    fontSize: 18
  }
});
