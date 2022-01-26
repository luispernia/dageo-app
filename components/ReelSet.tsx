import React, { Component } from 'react'
import { View, StyleSheet, Text, Animated } from "react-native";
import Constants from '../Constants';
import Reel from './Reel';
import patternContext from '../services/context/PatternContext';
import { Easing } from 'react-native-reanimated';

export default class ReelSet extends Component {

    static contextType = patternContext;
    reels: any;

    constructor(props) {
        super(props);

        this.state = {
            width: null,
            height: null,
            move: 1,
            opac: new Animated.Value(.8)
        }
        this.reels = [];
    }

    spin(val, fun) {
        for (let i = 0; i < Constants.REELS; i++) {
            switch (val) {
                case 2:
                    switch (i) {
                        case 0:
                            this.reels[i].spinNow(5, 0, "green tea", 6950);                            
                            break;
                        case 1:
                            this.reels[i].spinNow(15, -4, "", 5950);                                                        
                            break;
                        case 2:
                            this.reels[i].spinNow(7, -8,"", 3814);                                                                                    
                            break;
                    
                        default:
                            break;
                    }     
                break;
                case 3:
                    switch (i) {
                        case 0:
                            this.reels[i].spinNow(8,0, "ginger", 6426);                            
                            break;
                        case 1:
                            this.reels[i].spinNow(6,-4, "", 5433);
                            break;
                        case 2:
                            this.reels[i].spinNow(17,-8, "", 9715);
                            break;
                    
                        default:
                            break;
                    }     
                break;
                case 4:
                    switch (i) {
                        case 0:
                            this.reels[i].spinNow(1, 0, "peach", 8082);                                                        

                            break;
                        case 1:
                            this.reels[i].spinNow(13, -4, "", 4900);                                                        
                            break;
                        case 2:
                            this.reels[i].spinNow(16, -8, "", 2760);                                                                                    
                            break;
                    
                        default:
                            break;
                    }     
                break;
                case 1:
                    switch (i) {
                        case 0:
                            this.reels[i].spinNow(3, 0, "lemon", 7470);                            
                            break;
                        case 1:
                            this.reels[i].spinNow(12, -4, "", 4298);                                                        
                            break;
                        case 2:
                            this.reels[i].spinNow(10, -8, "", 2195);                                                                                    
                            break;
                    
                        default:
                            break;
                    }     
                break;
                case 6: // next
                this.reels[i].spinNow(this.state.move);
                this.setState({
                    move: this.state.move + 1
                })
                break;
                case 7:
                    this.reels[i].spinNow(0);  
                    this.setState({
                        move: 0
                    })     
                    break;
                default:
                    break;
            }
        }
        setTimeout(() => {
            Animated.timing(
                this.state.opac,
                {
                    toValue: .9,
                    duration: 1000,
                    easing: Easing.inOut(Easing.exp),
                    useNativeDriver: true,
                }
            ).start();
            // setTimeout(() => {
            //     Animated.timing(
            //         this.state.opac,
            //         {
            //             toValue: 1,
            //             duration: 500,
            //             useNativeDriver: true
            //         }
            //     ).start();
            // }, 600);
        }, 4000);
    }


    renderReels = () => {
        let reelList = Array.apply(null, Array(Constants.REELS)).map((e, i) => {
            return <Reel width={this.state.width} height={this.state.height} key={i} index={i} ref={(ref) => {
                this.reels[i] = ref;
            }} />
        });

        return (
            <>
                {reelList.map(e => {
                    return e;
                })}
            </>
        )

    }

    render() {
        return (
            <Animated.View onLayout={(e) => {
                this.setState({
                    width: e.nativeEvent.layout.width,
                    height: e.nativeEvent.layout.height
                })
            }} style={[styles.reelSet, {transform: [{scale: this.state.opac}]}]}>
                {this.state.width && this.state.height && this.renderReels()}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    reelSet: {
        flex: 1,
        backgroundColor: "rgb(252,245,226)",
    }
});