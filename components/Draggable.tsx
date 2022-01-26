import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Image, TouchableOpacity, Dimensions} from "react-native";
import patternContext from "../services/context/PatternContext";
import { useContext } from "react";
import WaveProgress from "./WaveProgress";
import { Audio } from "expo-av";


class Draggable extends Component {

  static contextType = patternContext;

  constructor(props: any) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY({ x: this.props.x, y: this.props.y }),
      opacity: new Animated.Value(1),
      scale: new Animated.Value(1),
      pattern: props.pattern,
      id: props.id,
      currentPattern: [],
      imgSource: props.img,
      nav: props.nav,
      sound: null,
      popUp: new Animated.Value(0),
      popUpText: "",
      sound: "",
      shadow: 0
    };
    this._val = { x: this.props.x, y: this.props.y }
    this.boom = this.boom.bind(this);
  }

  async playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/audio/ping.mp3')
    );
    this.setState({
      sound: sound
    });
    console.log('Playing Sound');
    await sound.playAsync();
  }

  async wrong() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/audio/fail.mp3')
    );
    this.setState({
      sound: sound
    });
    console.log('Playing Sound');
    await sound.playAsync();
  }

  boom() {

  Animated.timing(this.state.opacity, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true
  }).start(() => {
    this.setState({
      showDraggable: false
    });                
  });
      
  }

  showModal() {
    Animated.spring(
      this.state.popUp,
      {
        toValue: 1,
        useNativeDriver: true
      }
    ).start();
    setTimeout(() => {
      
      Animated.spring(
        this.state.popUp,
        {
          toValue: 0,
          useNativeDriver: true
        }
        ).start();
      }, 1000);
  }
  
  UNSAFE_componentWillMount() {
    this.state.pan.addListener((value) => this._val = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this.props.x,
          y: this.props.y
        })
    
        Animated.timing(this.state.scale, {
          toValue: 1.5,
          useNativeDriver: true,
          duration: 399
        }).start();
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: (e, gesture) => {
        Animated.timing(this.state.scale, {
          toValue: 1,
          useNativeDriver: true,
          duration: 200
        }).start();
        var exists = this.props.pattern.includes(Number(this.state.id));
        var bool = this.props.pattern[0] == this.state.id;
        if (this.isDropArea(gesture)) {
          if(exists) {
            if(bool) {
              setTimeout(() => {
                this.props.increase();
              }, 10);
     
              Animated.spring(this.state.scale, {
                toValue: 3,
              useNativeDriver: true,
            }).start();
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true
            }).start(() => {
              this.setState({
                showDraggable: false
              });                
            });
                

                // this.context.removeFirst();
                // this.context.addPattern(this.state.id);
          
            } else {
                this.setState({
                  popUpText: "Aún no"
                })
          
                this.showModal()
                this.props.repeat()
                Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start()
            }
          } else {
            this.setState({
                popUpText: "Esto no va aquí"
                })
        
                this.showModal()
                this.props.repeat()
                Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start()

          }
            }  else {
              this.setState({
                popUpText: "Apunta al vaso!"
              })
              this.showModal()
              Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start()
        }
      }
    });
  }

  isDropArea(gesture) {
    var y = gesture.moveY;
    var x = gesture.moveX;
    return (y >= 140 && y <= 480 && x >= 400 && x <= 600);
  }

  render() {
    return (
      <View style={{ width: "20%", alignItems: "center" }}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
        <View style={{ position: "absolute"}}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, { opacity: this.state.opacity }]}
          >
            <Animated.Text style={[styles.popUp, {transform: [{translateX: this.props.translateX}]}, {opacity: this.state.popUp}]}>{this.state.popUpText}</Animated.Text>
            <View style={styles.img_container}>
              <Animated.Image resizeMode="contain" style={
                [styles.img, { transform: [{ scale: this.state.scale }] }]
              } source={this.state.imgSource} />
            </View>
            <Animated.Text style={styles.item_title}>
            {/* ${this.props.id} */}
                {` ${this.props.name}`}
            </Animated.Text>  
          </Animated.View>
        </View>
      );
    }
  }
}


export default class App extends Component {
  static contextType = patternContext;
  drag2: React.RefObject<unknown>;
  drag1: React.RefObject<unknown>;
  drag3: React.RefObject<unknown>;
  drag4: React.RefObject<unknown>;
  constructor(props: any) {
    super(props);
    var pattern = props.pattern;
    this.drag1 = React.createRef();
    this.drag2 = React.createRef();
    this.drag3 = React.createRef();
    this.drag4 = React.createRef();
    this.drag5 = React.createRef();
    this.drag6 = React.createRef();
    this.drag7 = React.createRef();
    this.drag8 = React.createRef();

    this.state = {
      pattern: props.pattern,
      nav: props.nav,
      anim: new Animated.Value(200),
      value: .15,
      currentPattern: pattern,
      repeats: 0,
      iceOpac: new Animated.Value(0),
      walkerBrand: new Animated.Value(1),
      boom: new Animated.Value(1),
      garnish: new Animated.Value(0)

    };
    this.increaseVal = this.increaseVal.bind(this);
    this.shiftPattern = this.shiftPattern.bind(this);
    this.setRepeats = this.setRepeats.bind(this);

  }
  
  shiftPattern() {

    var removed = this.state.currentPattern;
    var shifted = removed.shift();
    console.log(shifted);
    this.setState({
      currentPattern: removed
    })
  }

  setRepeats() {
      let repeats = this.state.repeats;
      if(repeats + 1 == 3) {
        this.props.tries(true);
        this.boomMassive();
      } 
      this.setState({
        repeats: repeats + 1
      })
  }

  componentDidUpdate() {
    if(this.state.value >= .7) {
      this.props.modal(true);
      Animated.spring(  
        this.state.anim,
        {
          toValue: 0,
          useNativeDriver: true,
            
        }
      ).start();
    }
  }

  boomMassive() {
    this.drag1.current.boom();
    this.drag2.current.boom();
    this.drag3.current.boom();
    this.drag4.current.boom();
    this.drag5.current.boom();
    this.drag6.current.boom();
    this.drag7.current.boom();
    this.drag8.current.boom();
    Animated.timing(
      this.state.boom,
      {
        toValue: 0,
        duration: 700,
        useNativeDriver: true
      }
    ).start();
    setTimeout(() => {
      
      Animated.timing(
        this.state.garnish,
        {
          toValue: 1,
          duration: 700,
          useNativeDriver: true
        }
        ).start();
      }, 700);
  }

  increaseVal() {
    var val = this.state.value;
    var removed = this.state.currentPattern;
    var shift = removed.shift();
    if(shift == 6) {
      Animated.timing(
        this.state.iceOpac,
        {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000
        }
      ).start();
      Animated.timing(
        this.state.walkerBrand,
        {
          toValue: 0,
          useNativeDriver: true,
          duration: 500
        }
      ).start();
    }
    if(shift != 6) {
      this.setState({
        value: (val + this.context.increment) > .7? .74 : val + this.context.increment,
        currentPattern: removed
      })
    }
    
    if(removed.length == 0) {
      this.boomMassive();
    }

  }

  render() {
    let import1 = require("../assets/peach_tea.png");
    let import2 = require("../assets/ginger_ale.png");
    return (
        <View style={styles.mainContainer}>
          <Image style={{width: 1000, height: 50, position: "absolute", bottom: 0, left: -10, zIndex: 9999999}} resizeMode="contain" source={require("../assets/alter.png")} /> 

          <Image resizeMode="contain" style={styles.rightImageSource} source={require("../assets/img/cut1.png")} />
          <Image resizeMode="contain" style={styles.leftImageSource} source={require("../assets/img/cut3.png")} />

          <View style={styles.dropZone}>
            <WaveProgress show={this.state.garnish} boom={this.state.boom} walker={this.state.walkerBrand} ice={this.state.iceOpac} repeats={this.state.repeats} val={this.state.value}/>
          </View>
          <View style={styles.ballContainer} />
          <View style={styles.row}>
            <Draggable translateX={90} repeat={this.setRepeats} ref={this.drag1} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={70} y={-580} name="limonada"  id="2" img={require("../assets/limonada.png")} />
            <Draggable translateX={90} repeat={this.setRepeats} ref={this.drag2} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={10} y={-440} name={this.context.videoPath == "third"? "cáscara de limón" : "Té verde dulce"}  id="3" img={this.context.videoPath == "third"? require("../assets/concha_de_limon.png") : require("../assets/te_verde_dulce.png")} />
            <Draggable translateX={90} repeat={this.setRepeats} ref={this.drag3} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={10} y={-300} name={this.context.videoPath == "second"? "té de durazno dulce" : "ginger ale"}  id="4" img={this.context.videoPath == "second"?  import1 : import2} />
            <Draggable translateX={90} repeat={this.setRepeats} ref={this.drag4} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={700} y={-580} name="soda" id="5" img={require("../assets/soda.png")} />
            <Draggable translateX={-115} repeat={this.setRepeats} ref={this.drag5} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={760} y={-440} name="hielo" id="6" img={require("../assets/hielo.png")} />
            <Draggable translateX={-115} repeat={this.setRepeats} ref={this.drag6} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={760} y={-300} name="johnnie walker black label" id="7" img={require("../assets/black_label.png")} />
            <Draggable translateX={90} repeat={this.setRepeats} ref={this.drag7} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={700} y={-160} 
            name={
              this.context.videoPath == "third"? "Hierbabuena" :
              this.context.videoPath == "fourth"? "Rodaja de Naranja" : 
              this.context.videoPath == "first"? "hoja de piña" : "piel de naranja"}  
            id="1" 
            img={
              this.context.videoPath == "third" ? require("../assets/Hierbabuena.png") :
              this.context.videoPath == "fourth"? require("../assets/rodaja_limon.png") :
              this.context.videoPath == "first"? require("../assets/hoja.png") : require("../assets/piel_naranja.png")
            } />
            <Draggable translateX={90} repeat={this.setRepeats} ref={this.drag8} pattern={this.state.currentPattern} shiftPattern={this.shiftPattern} increase={this.increaseVal} val={this.state.value} x={70} y={-160} name="rodaja de durazno" id="8" img={require("../assets/durazno.png")} />          
          </View>
            
        </View>
    );
  }
}

let CIRCLE_RADIUS = 40;
const styles = StyleSheet.create({
  img_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
    
    borderRadius: 40,
  },
  overflow: {
    position:"absolute",
    top: 506,
    right: 0,
    zIndex: 9999999999999999999999999999

  },
  overflow_button: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    textTransform: "uppercase",
  },
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 410,
    backgroundColor: "#E69F30",
    zIndex: -1
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
  },
  row: {
  },
  dropZone: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#E69F30",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  img: {
    display: "flex",
    flex: 1,
    width: 80,
    height: 40,
   
  },
  item_fruit: {
    fontSize: 20,
    color: "white"
  },
  popUp: {
    position: "absolute",
    zIndex: 999999999999999999999,
    transform: [{ translateX: 90 }],
    width: 100,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    fontFamily: "Johnnie-Head",
    fontSize: 20
  },
  item_title: {
    position: "absolute",
    top: 90,
    width: 120,
    color: "white",
    fontFamily: "Johnnie-Head",
    textTransform: "uppercase",
    textAlign: "center",
    left: -25,
    fontSize: 18
  },
     button_style: {
        padding: 10,
        backgroundColor: "white",
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
    rightImageSource: {
      width: 300,
      height: 300,
      position: "absolute",
      bottom: 20,
      right: -91
    },
    leftImageSource: {
      width: 100,
      height: 400,
      position: "absolute",
      bottom: 100,
      left: -36,
      zIndex:999999
    }
});